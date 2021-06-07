/*
 * @Author: your name
 * @Date: 2021-06-06 10:22:23
 * @LastEditTime: 2021-06-06 14:18:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /web/nodejs/blog-express/routes/users.js
 */
var express = require('express');
var router = express.Router();
const {
    login
} = require('../controller/user');
const {
    SuccessModel,
    ErrorModel
} = require('../model/resModel');
/* GET users listing. */
router.post('/login', function (req, res, next) {
    const {
        username,
        password
    } = req.body;
    // const {
    //     username,
    //     password
    // } = req.query;
    const result = login(username, password);
    return result.then(data => {
        if (data.username) {
            //res.setHeader('Set-Cookie', `username=${data.username};path=/;httpOnly;expires=${getCookieExpires()}`);
            //设置session
            req.session.username = data.username;
            req.session.realname = data.realname;
            console.log('req.session', req.session);

            res.json(new SuccessModel('登陆成功'));
            return
        }
        res.json(new ErrorModel('登陆失败'));
    })
});
// router.get('/session-test', (req, res, next) => {
//     const session = req.session;
//     if (session.viewnum == null) {
//         session.viewnum = 0;
//     }
//     session.viewnum++;
//     res.json({
//         viewnum: session.viewnum
//     })
// })

router.get('/login-test', (req, res, next) => {
    if (req.session.username) {
        res.json({
            error: 0,
            msg: '登陆成功'
        })
        return
    }
    res.json({
        error: -1,
        msg: '登陆失败'
    })

})
module.exports = router;