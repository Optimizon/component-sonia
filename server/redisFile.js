// redisDemo.js
const express = require('express');



const redis = require('redis');
//const REDIS_PORT = process.env.REDIS_PORT;

const app = express();
const client = redis.createClient(); //used to be REDIS_PORT


client.on('connect', function() {
    console.log('Redis connected');
});


module.exports = client;

// Note: you can start, stop the redis server using following commands.

// /etc/init.d/redis-server stop
// /etc/init.d/redis-server start
