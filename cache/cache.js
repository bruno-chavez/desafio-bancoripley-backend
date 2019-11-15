"use strict";

const asyncRedis = require("async-redis");
const AWS = require('aws-sdk');

const ssm = new AWS.SSM();

async function getParameter() {

  let params = {
    Name: 'desafio-ripley-cache',
    WithDecryption: true
  };

  let request = await ssm.getParameter(params).promise();

  return request.Parameter.Value;
}

module.exports = (async function () {
  let host = await getParameter();
  let client = asyncRedis.createClient(6379, host);

  client.on("error", function (err) {
    console.log("Error: " + err);
  });

  return client
})();

/*class RedisClient {
  constructor() {
    let self = this;
    let params = {
      Name: 'desafio-ripley-cache',
      WithDecryption: true
    };

    ssm.getParameter(params, function(err, data) {
      self.client = redis.createClient(6379, data.Parameter.Value)
    });
  }
}

let c = new RedisClient();
console.log(c, 'on cache');
module.exports = c;*/
