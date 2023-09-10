const express = require('express');
const app = express();
const db = require('./models');
const cors = require('cors');
require('dotenv').config();

const port = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());

//Routers
const postRouter = require('./routes/Posts');
app.use('/posts', postRouter);

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
