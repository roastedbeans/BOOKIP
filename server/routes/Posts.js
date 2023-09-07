const express = require('express');
require('dotenv').config();
const router = express.Router();
const { Room, Booking, Registration } = require('../models');

// Create a new Room type
router.post('/room', async (req, res) => {
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

// Get all Room types
router.get('/room', async (req, res) => {
	try {
		const room = await Room.findAll();
		res.json(room);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

// Get Room type by registrationID
router.get('/room/registration/:registrationID', async (req, res) => {
	const registrationID = req.params.registrationID;
	try {
		const room = await Room.findAll({ where: { registrationID } });
		if (!room) {
			return res.status(404).json({ error: 'Room Type not found' });
		}
		res.json(room);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

// Update a Room
router.put('/room/id/:id', async (req, res) => {
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
router.delete('/room/id/:id', async (req, res) => {
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
router.delete('/room/registration/:registrationID', async (req, res) => {
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

// Get all Room
router.get('/room', async (req, res) => {
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

// Create a new registration
router.post('/registrations', async (req, res) => {
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
router.get('/registrations', async (req, res) => {
	try {
		const registrations = await Registration.findAll();
		if (!registrations || registrations.length === 0) {
			return res.status(404).json({ error: 'Registrations not found' });
		}
		res.json(registrations);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

// Get hotel information by userID
router.get('/registrations/user/:userID', async (req, res) => {
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
router.put('/registrations/user/:userID', async (req, res) => {
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
router.delete('/registrations/user/:userID', async (req, res) => {
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
router.get('/registrations/id/:id', async (req, res) => {
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
router.put('/registrations/id/:id', async (req, res) => {
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
router.delete('/registrations/id/:id', async (req, res) => {
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

// Create a new booking
router.post('/bookings', async (req, res) => {
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
router.get('/bookings', async (req, res) => {
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
router.get('/bookings/room/:roomID', async (req, res) => {
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
router.put('/bookings/room/:roomID', async (req, res) => {
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

module.exports = router;
