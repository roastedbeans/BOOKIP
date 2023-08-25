import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '@clerk/clerk-react';
import { Separator } from './ui/separator';
import { Card } from './ui/card';
import { HotelInfo } from '../Posts';

const HotelDisplay = () => {
	return (
		<Card className='2xs:w-full w-fit h-fit rounded-lg p-4 2xl:hover:scale-[101%] transition-all bg-white'>
			<div className='space-y-1'>
				<h4 className='text-lg font-medium leading-none'>{HotelInfo().hotelName}</h4>
				<div className='sm:flex-row flex-col flex sm:h-5 items-start sm:space-x-4 text-sm'>
					<p className='text-sm text-muted-foreground '>{HotelInfo().contactNumber}</p>
					<Separator
						orientation='vertical'
						className='sm:block hidden'
					/>
					<p className='text-sm text-muted-foreground'>{HotelInfo().street}</p>
				</div>
			</div>
			<Separator className='my-4' />
			<div className='sm:flex-row flex-col flex sm:h-5 items-start sm:space-x-4 text-sm'>
				<div>{HotelInfo().city}</div>
				<Separator
					orientation='vertical'
					className='sm:block hidden'
				/>
				<div>{HotelInfo().province}</div>
				<Separator
					orientation='vertical'
					className='sm:block hidden'
				/>
				<div>{HotelInfo().country}</div>
				<Separator
					orientation='vertical'
					className='sm:block hidden'
				/>
				<div>{HotelInfo().zipCode}</div>
			</div>
		</Card>
	);
};

export default HotelDisplay;
