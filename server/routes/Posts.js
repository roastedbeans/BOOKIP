const express = require('express');
const router = express.Router();
const { RoomTypes, Rooms, Booking } = require('../models');

// Get all room types
router.get('/room-types', async (req, res) => {
	const roomTypes = await RoomTypes.findAll();
	res.json(roomTypes);
});

// Get all rooms
router.get('/rooms', async (req, res) => {
	const rooms = await Rooms.findAll();
	res.json(rooms);
});

// Get all bookings
router.get('/bookings', async (req, res) => {
	const bookings = await Booking.findAll();
	res.json(bookings);
});

// Create a new room type
router.post('/room-types', async (req, res) => {
	const roomType = req.body;
	const newRoomType = await RoomTypes.create(roomType);
	res.json(newRoomType);
});

// Create a new room
router.post('/rooms', async (req, res) => {
	const room = req.body;
	const newRoom = await Rooms.create(room);
	res.json(newRoom);
});

// Create a new booking
router.post('/bookings', async (req, res) => {
	const bookingData = req.body;
	const newBooking = await Booking.create(bookingData);
	res.json(newBooking);
});

module.exports = router;
