const partNumber = require('../repository/part-number');

const listByPartNumber = async (req, res, next) => {
  try {
    await partNumber(req.params.part_number);
    res.sendStatus(201)
  } catch(e) {
    console.log(e.message);
    res.sendStatus(500)
  }
};

module.exports = listByPartNumber;

