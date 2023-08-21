const { v4: uuidv4 } = require('uuid');

module.exports = function(sequelize, DataTypes) {
	const Registration = sequelize.define('Registration', {
		userID: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		id: {
			defaultValue: () => uuidv4(),
			type: DataTypes.STRING,
			primaryKey: true,
			allowNull: false,
		},
		hotelName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		contactNumber: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		street: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		city: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		province: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		country: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		zipCode: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	});

	return Registration;
};
