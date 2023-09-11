const express = require('express');
require('dotenv').config();
const router = express.Router();
const { Income } = require('../models');

// Create a new income
router.post('/', async (req, res) => {
	const incomeData = req.body;
	try {
		const newIncome = await Income.create(incomeData);
		if (!newIncome) {
			return res.status(404).json({ error: 'Income not found' });
		}
		res.json(newIncome);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

// Get all incomes
router.get('/', async (req, res) => {
	try {
		const incomes = await Income.findAll();
		if (!incomes || incomes.length === 0) {
			return res.status(404).json({ error: 'Incomes not found' });
		}
		res.json(incomes);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

// Get income by userID
router.get('/incomes/user/:userID', async (req, res) => {
	const userID = req.params.userID;
	try {
		const income = await Income.findAll({ where: { userID } });
		if (!income) {
			return res.status(404).json({ error: 'Income not found' });
		}
		res.json(income);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

module.exports = router;
