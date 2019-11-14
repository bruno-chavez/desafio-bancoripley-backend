const redisClient = require('../cache/cache');
const axios = require('axios');

const fetchProduct = async function (id) {

  let product = {};

  redisClient.get(id, (err, data) => {
    if (err) {
      console.log(err);
      return
    }

    // if there are no matches in the cache, fetch the product from the API
    if (data === null) {
      axios.get(`https://simple.ripley.cl/api/v2/products/${id}`).then(p => {
        product = p;

        // EX 10 sets an expiration time of 10 seconds
        redisClient.set(id, p, 'EX', 10);
      });
    }

    product = data;
  });

  return product
};

module.exports = fetchProduct;
