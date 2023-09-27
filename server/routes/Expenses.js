const express = require('express');
require('dotenv').config();
const router = express.Router();
const { Expense } = require('../models');

// Create a new expense
router.post('/', async (req, res) => {
	const expenseData = req.body;
	try {
		const newExpense = await Expense.create(expenseData);
		if (!newExpense) {
			return res.status(404).json({ error: 'expense not found' });
		}
		res.json(newExpense);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

// Get all expenses
router.get('/', async (req, res) => {
	try {
		const expenses = await Expense.findAll();
		if (!expenses || expenses.length === 0) {
			return res.status(404).json({ error: 'expenses not found' });
		}
		res.json(expenses);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

// Get expense by registration and date
router.get('/:registrationID/:date', async (req, res) => {
	const registrationID = req.params.registrationID;
	const date = req.params.date;
	try {
		const expense = await Expense.findAll({ where: { registrationID, date } });
		if (!expense) {
			return res.status(404).json({ error: 'expense not found' });
		}
		res.json(expense);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

router.get('/:registrationID', async (req, res) => {
	const registrationID = req.params.registrationID;
	try {
		const expense = await Expense.findAll({ where: { registrationID } });
		if (!expense) {
			return res.status(404).json({ error: 'expense not found' });
		}
		res.json(expense);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

//Update expense by registrationID
router.put('/registration/:registrationID', async (req, res) => {
	const registrationID = req.params.registrationID;
	const expenseData = req.body;
	try {
		const expense = await Expense.update(expenseData, { where: { registrationID } });
		if (!expense) {
			return res.status(404).json({ error: 'expense not found' });
		}
		res.json({ message: 'expense updated' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

//Update expense by date
router.put('/date/:date', async (req, res) => {
	const date = req.params.date;
	const expenseData = req.body;
	try {
		const expense = await Expense.update(expenseData, { where: { date } });
		if (!expense) {
			return res.status(404).json({ error: 'expense not found' });
		}
		res.json({ message: 'expense updated' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

module.exports = router;
