const { v4: uuidv4 } = require('uuid');

module.exports = function(sequelize, DataTypes) {
	const Income = sequelize.define('Income', {
		id: {
			defaultValue: () => uuidv4(),
			type: DataTypes.STRING,
			primaryKey: true,
			allowNull: false,
		},
		date: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		income: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		expenses: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	});
	return Income;
};
