const express = require('express');
const app = express();
const db = require('./models');
const cors = require('cors');
const mysql2 = require('mysql2');
require('dotenv').config();

const port = process.env.MYSQL_ADDON_PORT || 5000;
app.use(express.json());
app.use(cors());

//Routers
const postRouter = require('./routes/Posts');
app.use('/posts', postRouter);

const connection = mysql2.createConnection({
	host: process.env.MYSQL_ADDON_HOST,
	user: process.env.MYSQL_ADDON_USER,
	password: process.env.MYSQL_ADDON_PASSWORD,
	database: process.env.MYSQL_ADDON_DB,
});

connection.connect();

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
