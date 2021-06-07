/*
 * @Author: your name
 * @Date: 2021-05-30 13:10:30
 * @LastEditTime: 2021-06-06 14:26:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /web/nodejs/blog1/src/db/redis.js
 */
const redis = require('redis');
const {
    REDIS_CONFIG
} = require('../config/db');
//创建客户端
const redisClient = redis.createClient(REDIS_CONFIG.port, REDIS_CONFIG.host);
redisClient.on('err', (err) => {
    console.log(err);
})
module.exports = redisClient;