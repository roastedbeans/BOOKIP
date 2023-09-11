const express = require('express');
const app = express();
const db = require('./models');
const cors = require('cors');
const mysql2 = require('mysql2');
const mysql2Promise = require('mysql2/promise'); // Import mysql2-promise
require('dotenv').config();

let port = 5000;
app.use(express.json());
app.use(cors());

//Routers
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

if (process.env.NODE_ENV === 'production') {
	port = process.env.PORT;
	// Create a connection pool
	const connection = mysql2.createConnection({
		host: process.env.MYSQL_ADDON_HOST,
		user: process.env.MYSQL_ADDON_USER,
		password: process.env.MYSQL_ADDON_PASSWORD,
		database: process.env.MYSQL_ADDON_DB,
	});

	connection.connect();
}

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
