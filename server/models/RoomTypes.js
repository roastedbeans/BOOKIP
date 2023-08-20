const { v4: uuidv4 } = require('uuid');

module.exports = function(sequelize, DataTypes) {
	const RoomTypes = sequelize.define('RoomTypes', {
		id: {
			defaultValue: () => uuidv4(),
			type: DataTypes.STRING,
			primaryKey: true,
			allowNull: false,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		roomType: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		bedNumber: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		crInclusion: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		tvInclusion: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		price12h: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		price24h: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	});

	return RoomTypes;
};
