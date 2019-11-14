"use strict";

const fetchProduct = require('../repository/part-number');

const listByPartNumber = async (req, res, next) => {
  try {
    let product = await fetchProduct(req.params.part_number);

    res.sendStatus(200);
    res.write(product);
  } catch (e) {
    console.log(e.message);
    res.sendStatus(500)
  }
};

module.exports = listByPartNumber;
