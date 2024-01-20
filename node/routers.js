const REGISTER = require('./controllers/admin');
const PRODUCT= require('./controllers/products');
const express = require('express')

const router = express.Router();

router.use('/admin', REGISTER);
router.use('/products', PRODUCT);

module.exports = router;