const express = require('express');
require('dotenv').config();
const router = express.Router();
const { Registration } = require('../models');

// Create a new registration
router.post('/', async (req, res) => {
	const registrationData = req.body;
	try {
		const newRegistration = await Registration.create(registrationData);
		if (!newRegistration) {
			return res.status(404).json({ error: 'Registration not found' });
		}
		res.json(newRegistration);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

// Get all registrations
router.get('/', async (req, res) => {
	try {
		const registrations = await Registration.findAll();
		console.log(registrations);
		if (!registrations) {
			return res.status(404).json({ error: 'Registrations not found' });
		}
		res.send(registrations);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

// Get hotel information by userID
router.get('/user/:userID', async (req, res) => {
	const userID = req.params.userID;
	try {
		const registration = await Registration.findOne({ where: { userID } });
		if (!registration) {
			return res.status(404).json({ error: 'Registration not found' });
		}
		res.json(registration);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

// Update hotel information by userID
router.put('/user/:userID', async (req, res) => {
	const userID = req.params.userID;
	const registrationData = req.body;
	try {
		const registration = await Registration.update(registrationData, { where: { userID } });
		if (!registration) {
			return res.status(404).json({ error: 'Registration not found' });
		}
		res.json({ message: 'Hotel information updated' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

// Delete hotel information by userID
router.delete('/user/:userID', async (req, res) => {
	const userID = req.params.userID;
	try {
		const deletedCount = await Registration.destroy({ where: { userID } });
		if (!deletedCount) {
			return res.status(404).json({ error: 'Registration not found' });
		}
		res.json({ message: 'Hotel information deleted' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

// Get hotel information by registrationID
router.get('/id/:id', async (req, res) => {
	const id = req.params.id;
	try {
		const registration = await Registration.findAll({ where: { id } });
		if (!registration) {
			return res.status(404).json({ error: 'Registration not found' });
		}
		res.json(registration);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

// Update hotel information by registrationID
router.put('/id/:id', async (req, res) => {
	const id = req.params.id;
	const hotel = req.body;
	try {
		const registration = await Registration.update(hotel, { where: { id } });
		if (!registration) {
			return res.status(404).json({ error: 'Registration not found' });
		}
		res.json({ message: 'Hotel information updated' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

// Delete hotel information by registrationID
router.delete('/id/:id', async (req, res) => {
	const id = req.params.id;
	try {
		const deletedCount = await Registration.destroy({ where: { id } });
		if (!deletedCount) {
			return res.status(404).json({ error: 'Registration not found' });
		}
		res.json({ message: 'Hotel information deleted' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

module.exports = router;
