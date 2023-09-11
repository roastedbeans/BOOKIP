const express = require('express');
require('dotenv').config();
const router = express.Router();
const { Room } = require('../models');

// Create a new Room type
router.post('/', async (req, res) => {
	const room = req.body;
	try {
		const newRoom = await Room.create(room);
		if (!newRoom) {
			return res.status(404).json({ error: 'Room Type not found' });
		}
		res.json(newRoom);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

// Get all Room
router.get('/', async (req, res) => {
	try {
		const room = await Room.findAll();
		if (!room || Room.length === 0) {
			return res.status(404).json({ error: 'Room not found' });
		}
		res.json(room);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

// Get Room type by registrationID
router.get('/registration/:registrationID', async (req, res) => {
	const registrationID = req.params.registrationID;
	try {
		const room = await Room.findAll({ where: { registrationID } });
		if (!room || room.length === 0) {
			return res.status(404).json({ error: 'Room Type not found' });
		}
		res.json(room);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

// Update a Room
router.put('/id/:id', async (req, res) => {
	const id = req.params.id;
	const roomData = req.body;
	try {
		const room = await Room.update(roomData, { where: { id } });
		if (!room) {
			return res.status(404).json({ error: 'Room not found' });
		}
		res.json({ message: 'Room updated' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

// Delete a Room
router.delete('/id/:id', async (req, res) => {
	const id = req.params.id;
	try {
		const deletedCount = await Room.destroy({ where: { id } });
		if (!deletedCount) {
			return res.status(404).json({ error: 'Room not found' });
		}
		res.json({ message: 'Room deleted' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

// Delete Room by registrationID
router.delete('/registration/:registrationID', async (req, res) => {
	const registrationID = req.params.registrationID;
	try {
		const deletedCount = await Room.destroy({ where: { registrationID } });
		if (!deletedCount) {
			return res.status(404).json({ error: 'Room not found' });
		}
		res.json({ message: 'Room deleted' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

module.exports = router;
