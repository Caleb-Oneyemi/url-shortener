const express = require('express');
const redirectToLongUrl = require('../controllers/index-controller');

const router = express.Router();

router.get('/:code', redirectToLongUrl);


module.exports = router;