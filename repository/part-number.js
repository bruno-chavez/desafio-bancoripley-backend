"use strict";

const redisClient = require('../cache/cache');
const axios = require('axios');

const fetchProduct = async function (id) {

  let err, cachedProduct = await redisClient.get(id);
  if (err) {
    console.log(err);
  }

  // if there are no matches in the cache, fetches the product from the API
  if (cachedProduct === null) {
    console.log('fetching from api');
    let apiProduct = await axios.get(`https://simple.ripley.cl/api/v2/products/${id}`);

    // EX 10 sets an expiration time of 10 seconds
    redisClient.set(id, apiProduct, 'EX', 10);
    return apiProduct
  }

  console.log('fetching from cache');
  return cachedProduct;
};

/*const fetchProduct = function (id) {

  let product;

  redisClient.get(id, (err, cachedProduct) => {
    if (err) {
      console.log(err);
      return;
    }

    // if there are no matches in the cache, product gets fetched from the API
    if (cachedProduct === null) {
      axios.get(`https://simple.ripley.cl/api/v2/products/${id}`).then(apiProduct => {
        product = apiProduct;

        // EX 10 sets an expiration time of 10 seconds
        redisClient.set(id, apiProduct, 'EX', 10);
      });
    } else {
      product = cachedProduct;
    }
  });

  return product
};*/

module.exports = fetchProduct;
