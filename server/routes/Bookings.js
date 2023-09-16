const express = require('express');
require('dotenv').config();
const router = express.Router();
const { Booking } = require('../models');

// Create a new booking
router.post('/', async (req, res) => {
	const bookingData = req.body;
	try {
		const newBooking = await Booking.create(bookingData);
		if (!newBooking) {
			return res.status(404).json({ error: 'Booking not found' });
		}
		res.json(newBooking);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

// Get all bookings
router.get('/', async (req, res) => {
	try {
		const bookings = await Booking.findAll();
		if (!bookings || bookings.length === 0) {
			return res.status(404).json({ error: 'Bookings not found' });
		}
		res.json(bookings);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

//Get booking by roomID
router.get('/room/:roomID', async (req, res) => {
	const roomID = req.params.roomID;
	try {
		const booking = await Booking.findAll({ where: { roomID } });
		if (!booking) {
			return res.status(404).json({ error: 'Booking not found' });
		}
		res.json(booking);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

//Update booking by roomID
router.put('/room/:roomID', async (req, res) => {
	const roomID = req.params.roomID;
	const bookingData = req.body;
	try {
		const booking = await Booking.update(bookingData, { where: { roomID } });
		if (!booking) {
			return res.status(404).json({ error: 'Booking not found' });
		}
		res.json({ message: 'Booking updated' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

//Get booking by registrationID
router.get('/registration/:registrationID', async (req, res) => {
	const registrationID = req.params.registrationID;
	try {
		const booking = await Booking.findAll({ where: { registrationID } });
		if (!booking) {
			return res.status(404).json({ error: 'Booking not found' });
		}
		res.json(booking);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

//Delete booking by registrationID
router.delete('/registration/:registrationID', async (req, res) => {
	const registrationID = req.params.registrationID;
	try {
		const deletedCount = await Booking.destroy({ where: { registrationID } });
		if (!deletedCount) {
			return res.status(404).json({ error: 'Booking not found' });
		}
		res.json({ message: 'Booking deleted' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

module.exports = router;
