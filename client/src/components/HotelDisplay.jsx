import React, { useEffect, useState } from 'react';
import { Separator } from './ui/separator';
import { Card } from './ui/card';
import { HotelInfo } from '../Posts';
import HotelFormUpdate from './RegistrationFormUpdate';

const HotelDisplay = () => {
	const hotelInfo = HotelInfo();
	const [selectedHotel, setSelectedHotel] = useState([]);
	const { hotelName, contactNumber, street, city, province, country, zipCode } = hotelInfo;
	useEffect(() => {
		setSelectedHotel(hotelInfo);
	}, [hotelInfo]);

	return (
		<>
			<Card className='2xs:w-full w-fit h-fit rounded-lg p-4 2xl:hover:scale-[101%] transition-all bg-white'>
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
