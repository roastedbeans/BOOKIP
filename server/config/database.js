require('dotenv').config();

const config = {
	use_env_variable: process.env.MYSQL_ADDON_URI,
	development: {
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_DATABASE,
		host: process.env.DB_HOST,
		dialect: 'mysql',
	},
	production: {
		username: process.env.MYSQL_ADDON_USER,
		password: process.env.MYSQL_ADDON_PASSWORD,
		database: process.env.MYSQL_ADDON_DB,
		host: process.env.MYSQL_ADDON_HOST,
		dialect: 'mysql',
	},
};

module.exports = config;
