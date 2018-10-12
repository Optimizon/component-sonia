// redisDemo.js
const express = require('express');
const redis = require('redis');
//const REDIS_PORT = process.env.REDIS_PORT;

const app = express();
const client = redis.createClient(6379, 'ec2-54-153-31-183.us-west-1.compute.amazonaws.com'); //used to be REDIS_PORT


client.on('connect', function() {
    console.log('Redis connected');
});


module.exports = client;

// Note: you can start, stop the redis server using following commands.

// /etc/init.d/redis-server stop
// /etc/init.d/redis-server start


///etc/nginx