import React, { useEffect, useState } from 'react';
import { Separator } from './ui/separator';
import { Card } from './ui/card';
import { host, HotelInfo, BookingInfoByRegistrationID } from '@/Posts';
import HotelFormUpdate from './RegistrationFormUpdate';
import axios from 'axios';

const HotelDisplay = () => {
	const hotelInfo = HotelInfo();
	const fetchBookingData = BookingInfoByRegistrationID(hotelInfo.id);
	const [selectedHotel, setSelectedHotel] = useState([]);

	const { hotelName, contactNumber, street, city, province, country, zipCode } = hotelInfo;

	useEffect(() => {
		setSelectedHotel(hotelInfo);
	}, [hotelInfo]);

	useEffect(() => {
		const calculateIncome = () => {
			const totals = {};
			fetchBookingData.forEach((data) => {
				const [year, month] = data.checkInDate.split('-');
				const incomePrice = parseFloat(data.price);
				const date = `${month}-${year}`;

				if (!totals[date]) {
					totals[date] = 0;
				}
				totals[date] += incomePrice;
			});
			return totals;
		};

		const incomeTotals = calculateIncome();
		const currentDate = new Date();
		const currentMonth = `${String(currentDate.getMonth() + 1).padStart(2, '0')}-${currentDate.getFullYear()}`;

		const fetchIncomeData = async () => {
			try {
				const response = await axios.get(`${host}/incomes/${hotelInfo.id}/${currentMonth}`);
				const existingIncome = response.data[0];
				if (!existingIncome && hotelInfo.id && fetchBookingData) {
					// If no existing income data, create a new record
					const newIncomeData = {
						income: incomeTotals[currentMonth],
						date: currentMonth,
						registrationID: hotelInfo.id,
					};
					const insertResponse = await axios.post(`${host}/incomes`, newIncomeData);
					console.log('New income data inserted:', insertResponse.data);
				} else if (existingIncome && incomeTotals[currentMonth] && fetchBookingData) {
					// If existing income data, update the record
					const updatedIncomeData = {
						income: incomeTotals[currentMonth],
						tax: existingIncome.tax,
					};
					const updateResponse = await axios.put(`${host}/incomes/date/${currentMonth}`, updatedIncomeData);
					console.log('Income data updated:', updateResponse.data);
				}
			} catch (error) {
				console.error('Error fetching/updating income data:', error);
			}
		};

		fetchIncomeData();
	}, [hotelInfo.id, fetchBookingData]);

	return (
		<>
			<Card className='2xs:w-full w-fit h-fit rounded-lg p-4 2xl:hover:scale-[101%] 2xl:hover:shadow-lg transition-all bg-to-[rgba(255,255,255,.4)] backdrop-blur-md'>
				<div className='space-y-1'>
					<div className='w-full flex justify-between'>
						<h4 className='text-lg font-medium leading-none'>{hotelName}</h4>
						<HotelFormUpdate hotel={selectedHotel} />
					</div>

					<div className='sm:flex-row flex-col flex sm:h-5 items-start sm:space-x-4 text-sm'>
						<p className='text-sm text-muted-foreground '>{contactNumber}</p>
						<Separator orientation='vertical' className='sm:block hidden' />
						<p className='text-sm text-muted-foreground'>{street}</p>
					</div>
				</div>
				<Separator className='my-4' />
				<div className='sm:flex-row flex-col flex sm:h-5 items-start sm:space-x-4 text-sm'>
					<div>{city}</div>
					<Separator orientation='vertical' className='sm:block hidden' />
					<div>{province}</div>
					<Separator orientation='vertical' className='sm:block hidden' />
					<div>{country}</div>
					<Separator orientation='vertical' className='sm:block hidden' />
					<div>{zipCode}</div>
				</div>
			</Card>
		</>
	);
};

export default HotelDisplay;
