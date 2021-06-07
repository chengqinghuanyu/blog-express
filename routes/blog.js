/*
import { session } from 'express-session';
 * @Author: your name
 * @Date: 2021-06-06 11:00:06
 * @LastEditTime: 2021-06-06 15:50:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /web/nodejs/blog-express/routes/blog.js
 */
var express = require('express');
var router = express.Router();
const {
    getList,
    getDetail,
    nowBlog,
    upDate,
    del
} = require('../controller/blog');

const {
    SuccessModel,
    ErrorModel
} = require('../model/resModel');
const loginCheck = require('../middleware/checkLogin');
/* GET home page. */
router.get('/list', loginCheck, (req, res, next) => {
    let author = req.query.author || '';
    if (req.query.isAdmin) {
        console.log('isadmin');
        //管理员界面
        if (res.session.username == null) {
            console.error('is admin not login');
            res.json(new ErrorModel('未登录'))
            return
        }
        author = req.query.author;
    }

    const keyword = req.query.keyword || '';
    console.log('autor:', author);
    console.log('keyword:', keyword);
    const result = getList(author, keyword);

    return result.then(list => {
        res.json(new SuccessModel(list));
    })
});
router.get('/detail', loginCheck, (req, res, next) => {
    const id = req.query.id;
    let resultDetail = getDetail(id);
    return resultDetail.then(detail => {
        res.json(new SuccessModel(detail));
    })
});
router.post('/new', loginCheck, (req, res, next) => {
    const author = req.session.username;
    req.body.author = author;
    const result = nowBlog(req.body);
    return result.then(data => {
        res.json(new SuccessModel(data));
    })
})
router.post('/update', loginCheck, (req, res, next) => {
    const id = req.query.id;
    const result = upDate(id, req.body);

    return result.then(val => {
        if (val) {
            res.json(new SuccessModel('更新博客成功'));
        }
        res.json(new ErrorModel('更新博客失败'));
    });
})
router.post('/del', loginCheck, (req, res, next) => {
    const author = req.session.username; //真实数据
    const id = req.query.id;
    const result = del(id, author);
    console.log(author);
    console.log(id);
    return result.then(val => {
        if (val) {
            res.json(new SuccessModel('删除成功'));
        }

        res.json(new ErrorModel('删除博客失败'));
    })
})
module.exports = router;