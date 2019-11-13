let express = require('express');
let router = express.Router();

//controllers
let listByPartNumber = require('../controllers/part-number');

router.get('/', (req, res) => res.send('Everything is fine in the back-end'));
router.get('/part_number/:part_number', listByPartNumber);


module.exports = router;
