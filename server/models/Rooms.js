module.exports = function(sequelize, DataTypes) {
	const Rooms = sequelize.define('Rooms', {
		id: {
			type: DataTypes.STRING,
			primaryKey: true,
		},
		roomTypeId: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		roomNumber: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		status: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
		},
	});
	return Rooms;
};
