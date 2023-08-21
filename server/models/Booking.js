module.exports = function(sequelize, DataTypes) {
	const Booking = sequelize.define('Booking', {
		id: {
			type: DataTypes.STRING,
			primaryKey: true,
		},
		roomId: {
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
		checkInDate: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		checkOutDate: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		status: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
		},
	});
	return Booking;
};
