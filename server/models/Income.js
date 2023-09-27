const { v4: uuidv4 } = require('uuid');

module.exports = function(sequelize, DataTypes) {
	const Income = sequelize.define('Income', {
		id: {
			defaultValue: () => uuidv4(),
			type: DataTypes.STRING,
			allowNull: false,
		},
		registrationID: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		date: {
			type: DataTypes.STRING,
			primaryKey: true,
			allowNull: false,
		},
		income: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		expenses: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		tax: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	});
	return Income;
};
