const express = require('express');
const router = express.Router();
const ImageRoute = require('./image.route');

router.use('/image', ImageRoute)

module.exports = router;