/*
 * @Author: your name
 * @Date: 2021-06-06 10:22:23
 * @LastEditTime: 2021-06-06 10:53:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /web/nodejs/blog-express/routes/users.js
 */
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;