const express = require('express');
const app = express();
const db = require('./models');
const cors = require('cors');
const mysql2 = require('mysql2');
require('dotenv').config();

let port = 5000;
app.use(express.json());
app.use(cors());

// Routers
const postRouter = require('./routes/Posts');
const incomeRouter = require('./routes/Incomes');
const roomRouter = require('./routes/Rooms');
const bookingRouter = require('./routes/Bookings');
const registrationRouter = require('./routes/Registrations');

app.use('/posts', postRouter);
app.use('/incomes', incomeRouter);
app.use('/rooms', roomRouter);
app.use('/bookings', bookingRouter);
app.use('/registrations', registrationRouter);

db.sequelize
	.sync()
	.then(() => {
		app.listen(port, () => {
			console.log(`Server is running on port ${port}`);
		});
	})
	.catch((err) => {
		console.log(err);
	});
