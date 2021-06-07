/*
 * @Author: your name
 * @Date: 2021-06-06 14:36:39
 * @LastEditTime: 2021-06-06 14:39:09
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /web/nodejs/blog-express/middleware/checkLogin.js
 */
const {
    ErrorModel
} = require('../model/resModel');
module.exports = (req, res, next) => {
    if (req.session.username) {
        next();
        return
    }
    res.json(new ErrorModel('未登录'))
}