"use strict";

const axios = require('axios');


const fetchProduct = async function (id) {
  const client = await require('../cache/cache');

  let cachedProduct = await client.get(id);

  // if there are no matches in the cache, fetches the product from the API
  if (cachedProduct === null) {
    let apiProduct;
    let flag = true;

    // this while simulates a 15% error on consulting the API
    while (flag) {
      if (Math.floor(Math.random() * 100) <= 14) {
        console.log('error on fetching data from the api, retrying...');
      } else {
        apiProduct = await axios.get(`https://simple.ripley.cl/api/v2/products/${id}`);
        flag = false;
      }
    }

    // EX 120 sets an expiration time of 120 seconds
    client.set(id, JSON.stringify(apiProduct.data), 'EX', 120);
    return apiProduct.data
  }

  return JSON.parse(cachedProduct);
};

module.exports = fetchProduct;
