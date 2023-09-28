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
			defaultValue: '0',
			type: DataTypes.STRING,
			allowNull: true,
		},
		personnelCosts: {
			defaultValue: '0',
			type: DataTypes.STRING,
			allowNull: true,
		},
		marketingPromotions: {
			defaultValue: '0',
			type: DataTypes.STRING,
			allowNull: true,
		},
		guestServices: {
			defaultValue: '0',
			type: DataTypes.STRING,
			allowNull: true,
		},
		propertyInvestments: {
			defaultValue: '0',
			type: DataTypes.STRING,
			allowNull: true,
		},
	});
	return Expense;
};
