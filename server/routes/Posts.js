const express = require('express');
require('dotenv').config();
const router = express.Router();

const { RoomTypes, Rooms, Booking, Registration } = require('../models');

// Get all room types
router.get('/room-types', async (req, res) => {
	const roomTypes = await RoomTypes.findAll();
	res.json(roomTypes);
});

// Get room type by registrationID
router.get('/room-types/:registrationID', async (req, res) => {
	const registrationID = req.params.registrationID;
	const roomTypes = await RoomTypes.findAll({ where: { registrationID } });
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

// Get Registration
router.get('/registration', async (req, res) => {
	const registration = await Registration.findAll();
	res.json(registration);
});

// Get hotel information by userID
router.get('/registration/:userID', async (req, res) => {
	const userID = req.params.userID;
	const registration = await Registration.findOne({ where: { userID } });
	res.json(registration);
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

// Create a new registration
router.post('/registration', async (req, res) => {
	const registrationData = req.body;
	const newRegistration = await Registration.create(registrationData);
	res.json(newRegistration);
});

module.exports = router;
