import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '@clerk/clerk-react';
import { IncomeTableForm, incomeForm, ExpenseTableForm } from './formValue';

export const host = 'http://localhost:5000';

export function HotelInfo() {
	const { user } = useUser();
	const [hotelInfo, setHotelInfo] = useState([]);

	useEffect(() => {
		async function fetchData() {
			try {
				const response = await axios.get(`${host}/registrations/user/${user.id}`);
				setHotelInfo(response.data);
			} catch (error) {
				console.error('Error fetching HotelInfo: ', error);
			}
		}
		fetchData();
	}, [user.id]);

	return hotelInfo;
}

export function RoomInfo(registrationID) {
	const [roomInfo, setRoomInfo] = useState([]);

	useEffect(() => {
		async function fetchData() {
			if (registrationID === undefined) {
				return;
			}
			try {
				await axios.get(`${host}/rooms/registration/${registrationID}`).then((response) => {
					//sort by room name
					const sortedData = response.data.sort((a, b) => (a.name > b.name ? 1 : -1));
					setRoomInfo(sortedData);
				});
			} catch (error) {
				console.log('Error fetching RoomInfo: ', error);
			}
		}
		fetchData();
	}, [registrationID]);

	return roomInfo;
}

export function BookingInfoByRegistrationID(registrationID) {
	const [bookingInfo, setBookingInfo] = useState([]);

	useEffect(() => {
		async function fetchData() {
			try {
				await axios.get(`${host}/bookings/registration/${registrationID}`).then((response) => {
					setBookingInfo(response.data);
				});
			} catch (error) {
				console.error('Error fetching BookingInfo: ', error);
			}
		}
		fetchData();
	}, [registrationID]);

	return bookingInfo;
}

export function BookingInfo() {
	const [bookingInfo, setBookingInfo] = useState([]);

	useEffect(() => {
		async function fetchData() {
			try {
				await axios.get(`${host}/bookings`).then((response) => {
					setBookingInfo(response.data);
				});
			} catch (error) {
				console.error('Error fetching BookingInfo: ', error);
			}
		}
		fetchData();
	}, []);

	return bookingInfo;
}

export function BookingInfoByID(roomID) {
	const [bookingInfo, setBookingInfo] = useState([]);

	useEffect(() => {
		async function fetchData() {
			try {
				await axios.get(`${host}/bookings/room/${roomID}`).then((response) => {
					//filter by the status of the booking
					const filteredData = response.data.filter((booking) => booking.status === true)[0];
					setBookingInfo(filteredData);
				});
			} catch (error) {
				console.log('Error fetching BookingInfoByID: ', error);
			}
		}
		fetchData();
	}, [roomID]);

	return bookingInfo;
}

export function IncomeInfoByRegistrationID(registrationID) {
	const [incomeInfo, setIncomeInfo] = useState([]);

	useEffect(() => {
		async function fetchData() {
			try {
				await axios.get(`${host}/incomes/${registrationID}`).then((response) => {
					setIncomeInfo(response.data);
				});
			} catch (error) {
				console.error('Error fetching IncomeInfo: ', error);
			}
		}
		fetchData();
	}, [registrationID]);

	return incomeInfo;
}

export function ExpenseInfoByRegistrationID(registrationID) {
	const [expenseInfo, setExpenseInfo] = useState([]);

	useEffect(() => {
		async function fetchData() {
			try {
				await axios.get(`${host}/expenses/${registrationID}`).then((response) => {
					setExpenseInfo(response.data);
				});
			} catch (error) {
				console.error('Error fetching ExpenseInfo: ', error);
			}
		}
		fetchData();
	}, [registrationID]);

	return expenseInfo;
}

export function IncomeTableContent(incomeData) {
	// Initialize the monthlyCalculations array using useState
	const [monthlyCalculations, setMonthlyCalculations] = useState([]);

	// Create a helper function to find or create a month entry in the array
	function findOrCreateMonthEntry(monthKey) {
		const existingEntry = monthlyCalculations.find((entry) => entry.key === monthKey);
		if (existingEntry) {
			return existingEntry;
		}

		const newEntry = {
			key: monthKey,
			period: monthKey.split('-')[0],
			year: monthKey.split('-')[1],
			income: 0,
			expenses: 0,
			beforeTax: 0,
			taxExpense: 0,
			netIncome: 0,
		};

		// Use the setMonthlyCalculations function to update the state
		setMonthlyCalculations((prevCalculations) => [...prevCalculations, newEntry]);

		return newEntry;
	}

	// Iterate through the data and group entries by month
	incomeData.forEach((entry) => {
		const monthKey = entry.date;

		const monthEntry = findOrCreateMonthEntry(monthKey);

		const entryIncome = parseFloat(entry.income);
		const entryExpense = parseFloat(entry.expenses);
		const entryTax = parseFloat(entry.tax);
		// Add income and expense to the respective month
		if (!isNaN(entryIncome)) {
			monthEntry.income = entryIncome;
		}
		if (!isNaN(entryExpense)) {
			monthEntry.expenses = entryExpense;
		}
		if (!isNaN(entryTax)) {
			monthEntry.tax = entryTax * 0.01;
		}
	});

	// Calculate net income, income tax expense, and net income for each month
	monthlyCalculations.forEach((monthData) => {
		// Calculate net income before tax for the month
		monthData.beforeTax = monthData.income - monthData.expenses;

		monthData.taxExpense = monthData.income * monthData.tax;

		// Calculate net income for the month
		monthData.netIncome = monthData.beforeTax - monthData.taxExpense;
	});

	return monthlyCalculations;
}
