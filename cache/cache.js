const redis = require('redis');
const AWS = require('aws-sdk');

let params = {
  Names: ['desafio-ripley-cache'],
  WithDecryption: true
};

let redisClient = redis.createClient();
const ssm = new AWS.SSM();

ssm.getParameters(params, function (err, data) {
  if (err) {
    console.log(err, err.stack);
  } else {
    console.log(data);
     redisClient = redis.createClient(data);
  }
});

redisClient.on("error", function (err) {
  console.log("Error: " + err);
});

console.log(redisClient);

module.exports = redisClient;
