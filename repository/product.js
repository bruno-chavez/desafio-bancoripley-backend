"use strict";

const axios = require('axios');


const fetchProduct = async function (id) {
  const client = await require('../cache/cache');

  let cachedProduct = await client.get(id);

  // if there are no matches in the cache, fetches the product from the API
  if (cachedProduct === null) {
    console.log('fetching from api');
    let apiProduct;
    let flag = true;
    while (flag) {
      if (Math.floor(Math.random() * 100) <= 14) {
        console.log('error on fetching data from the api');
      } else {
        apiProduct = await axios.get(`https://simple.ripley.cl/api/v2/products/${id}`);
        flag = false;
      }
    }

    // EX 10 sets an expiration time of 10 seconds
    client.set(id, apiProduct.data.toString(), 'EX', 10);
    return apiProduct.data
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
