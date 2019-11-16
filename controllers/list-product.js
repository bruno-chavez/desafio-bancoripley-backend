"use strict";

const fetchProduct = require('../repository/product');

const listByPartNumber = async (req, res, next) => {
  try {
    let product = await fetchProduct(req.params.part_number);
    await res.json(product);
  } catch (e) {
    console.log(e.message, 'error at controller');
    res.sendStatus(500)
  }
};

module.exports = listByPartNumber;
