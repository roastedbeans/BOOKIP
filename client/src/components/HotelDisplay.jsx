import React, { useEffect, useState } from 'react';
import { Separator } from './ui/separator';
import { Card } from './ui/card';
import { format } from 'date-fns';
import { incomeForm } from '@/formValue';
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
	}, []);

	useEffect(() => {
		const totals = {};
		let date = null;
		let month = null;

		fetchBookingData.forEach((data) => {
			date = data.checkInDate.split('-')[1] + '-' + data.checkInDate.split('-')[0];
			month = data.checkInDate.split('-')[1];
			const incomePrice = parseFloat(data.price);

			if (!totals[month]) {
				totals[month] = 0;
			}
			totals[month] += incomePrice;
		});

		const incomeData = { income: totals[month], date: date, registrationID: hotelInfo.id };

		async function fetchData() {
			try {
				const response = await axios.get(`${host}/incomes/${hotelInfo.id}/${date}`);
				response.data.forEach((data) => {
					if (data.date === date && data.date) {
						axios
							.put(`${host}/incomes/date/${incomeData.date}`, {
								income: incomeData.income,
							})
							.then((response) => {
								console.log(response.data);
							});
					} else if (data.date !== date && data.date) {
						axios.post(`${host}/incomes`, incomeData).then((response) => {
							console.log(response.data);
						});
					}
				});
			} catch (err) {
				console.log(err);
			}
		}
		fetchData();
	}, [fetchBookingData]);

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
