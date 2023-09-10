const express = require('express');
const app = express();
const db = require('./models');
const cors = require('cors');
const mysql2 = require('mysql2');
const mysql2Promise = require('mysql2/promise'); // Import mysql2-promise
require('dotenv').config();

const port = process.env.MYSQL_ADDON_PORT || 5000;
app.use(express.json());
app.use(cors());

//Routers
const postRouter = require('./routes/Posts');
app.use('/posts', postRouter);

// Create a connection pool
const pool = mysql2.createPool({
	host: process.env.MYSQL_ADDON_HOST,
	user: process.env.MYSQL_ADDON_USER,
	password: process.env.MYSQL_ADDON_PASSWORD,
	database: process.env.MYSQL_ADDON_DB,
	waitForConnections: true, // Allow waiting for connections if all are in use
	connectionLimit: 10, // Adjust the limit as per your needs
	queueLimit: 0, // No limit for queued connections
});

async function connectDatabase() {
	try {
		// Get a connection from the pool
		const connection = await pool.getConnection();

		// Release the connection when done with it
		connection.release();

		console.log('Connected to the database');
	} catch (error) {
		console.error('Error connecting to the database:', error);
		// You can add code here to handle the connection error and decide whether to restart the server
	}
}

// Function to periodically check and connect to the database
function checkDatabaseConnection() {
	setInterval(connectDatabase, 60000); // Adjust the interval as needed (e.g., every minute)
}

// Start checking the database connection
checkDatabaseConnection();

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
