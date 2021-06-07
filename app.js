/*
import redisClient from '../../node-sso/redis';
 * @Author: your name
 * @Date: 2021-06-06 10:22:23
 * @LastEditTime: 2021-06-06 15:42:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /web/nodejs/blog-express/app.js
 */
//处理错误页面
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var fs = require('fs');
//解析cookie
var cookieParser = require('cookie-parser');
//日志记录
var logger = require('morgan');
const session = require('express-session');
//引入redids存储数据
const RedisStore = require('connect-redis')(session);
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
const blogRouter = require('./routes/blog');
const userRouter = require('./routes/user');

//初始化运行的入口本次http请求实例
var app = express();

// view engine setup--视图引擎设置
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
//请求过来使用-app.use
const ENV = process.env.NODE_ENV;
if (ENV != 'production') {
  //开发环境
  app.use(logger('dev'));
} else {
  //线上环境
  const logFullName = path.join(__dirname, 'logs', 'access.log');
  const writeStream = fs.createWriteStream(logFullName, {
    flags: 'a'
  })
  app.use(logger('combined', {
    stream: writeStream
  }));
}

//处理为json格式
app.use(express.json());
//兼容其他数据格式
app.use(express.urlencoded({
  extended: false
}));
//解析cookie
app.use(cookieParser());
//静态文件资源
// app.use(express.static(path.join(__dirname, 'public')));
//使用redis 存储session
const redisClient = require('./db/redis');
const sessionStore = new RedisStore({
  client: redisClient
})
//存储session
app.use(session({
  secret: 'Wjol_8766#19981_',
  cookie: {
    path: '/', //默认配置
    httpOnly: true, //默认配置
    maxAge: 24 * 60 * 60 * 1000 //
  },
  store: sessionStore
}));
//注册路由
// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/api/blog/', blogRouter);
app.use('/api/user/', userRouter);


// catch 404 and forward to error handler--处理404
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler--处理错误信息程序
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;