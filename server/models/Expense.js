const { v4: uuidv4 } = require('uuid');

module.exports = function(sequelize, DataTypes) {
	const Expense = sequelize.define('Expense', {
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
		operationalExpenses: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		personnelCosts: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		marketingPromotions: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		guestServices: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		propertyInvestments: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	});
	return Expense;
};
