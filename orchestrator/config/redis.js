const Redis = require("ioredis");
require("dotenv").config();
const redis = new Redis({
  host: "redis-16945.c252.ap-southeast-1-1.ec2.cloud.redislabs.com",
  port: 16945,
  password: "1fxYG5P6rDWuArFXIz8T8ikjGmF6RXi9",
});

module.exports = redis;
