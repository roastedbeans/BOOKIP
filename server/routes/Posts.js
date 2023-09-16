const express = require('express');
require('dotenv').config();
const router = express.Router();

router.get('/', (req, res) => {
	res.send('Welcome to the Hotel API!');
});

module.exports = router;
