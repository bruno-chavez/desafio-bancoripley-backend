"use strict";

const redis = require('redis');
const AWS = require('aws-sdk');


const ssm = new AWS.SSM();

const params = {
  Names: ['desafio-ripley-cache'],
  WithDecryption: true
};

ssm.getParameters(params, (err, data) => {
  console.log(data);
  if (err) {
    console.log("failed to connect to ElastiCache");
    console.log(err);
    return
  }

  let redisClient = redis.createClient(data.Parameters[0].Value);

  redisClient.on("error", function (err) {
    console.log("Error: " + err);
  });

  module.exports = redisClient;
});
