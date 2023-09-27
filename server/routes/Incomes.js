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

// Get income by registration and date
router.get('/:registrationID/:date', async (req, res) => {
	const registrationID = req.params.registrationID;
	const date = req.params.date;
	try {
		const income = await Income.findAll({ where: { registrationID, date } });

		if (!income) {
			return res.status(404).json({ error: 'Income not found' });
		}
		res.json(income);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

router.get('/:registrationID', async (req, res) => {
	const registrationID = req.params.registrationID;
	try {
		const income = await Income.findAll({ where: { registrationID } });
		if (!income) {
			return res.status(404).json({ error: 'Income not found' });
		}
		res.json(income);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

//Update income by registrationID
router.put('/registration/:registrationID', async (req, res) => {
	const registrationID = req.params.registrationID;
	const incomeData = req.body;
	try {
		const income = await Income.update(incomeData, { where: { registrationID } });
		if (!income) {
			return res.status(404).json({ error: 'Income not found' });
		}
		res.json({ message: 'Income updated' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

//Update income by date
router.put('/date/:date', async (req, res) => {
	const date = req.params.date;
	const incomeData = req.body;
	try {
		const income = await Income.update(incomeData, { where: { date } });
		if (!income) {
			return res.status(404).json({ error: 'Income not found' });
		}
		res.json({ message: 'Income updated' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

// Delete income by registrationID
router.delete('/registration/:registrationID', async (req, res) => {
	const registrationID = req.params.registrationID;
	try {
		const income = await Income.destroy({ where: { registrationID } });
		if (!income) {
			return res.status(404).json({ error: 'Income not found' });
		}
		res.json({ message: 'Income deleted' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

module.exports = router;
