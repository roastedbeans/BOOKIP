const { v4: uuidv4 } = require('uuid');

module.exports = function(sequelize, DataTypes) {
	const Booking = sequelize.define('Booking', {
		id: {
			defaultValue: () => uuidv4(),
			type: DataTypes.STRING,
			primaryKey: true,
			allowNull: false,
		},
		roomID: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		roomName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		customerName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		customerPhone: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		hours: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		checkInDate: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		checkOutDate: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		price: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		status: {
			defaultValue: false,
			type: DataTypes.BOOLEAN,
			allowNull: false,
		},
	});
	return Booking;
};
