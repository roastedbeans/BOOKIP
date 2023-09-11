/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import HotelDisplay from '@/components/HotelDisplay';
import { HotelInfo } from '@/Posts.jsx';
import Room from '@/components/Room';
import { Separator } from '@/components/ui/separator';
import RegistrationForm from '@/components/RegistrationForm';
import RoomImage from '../assets/roomlist-image.svg';
import Footer from '@/components/Footer';

const MainPage = () => {
	const hotelInfo = HotelInfo();

	return (
		<>
			<div className='w-full h-fit'>
				<Navbar />
				<div className='w-full min-h-screen pt-5 sm:px-10 px-2 m-0 flex flex-col items-center'>
					{hotelInfo && hotelInfo.length === 0 ? (
						<RegistrationForm />
					) : (
						<>
							<HotelDisplay />
							<img
								className='absolute h-full right-0 lg:-translate-y-10 md:-translate-y-10  sm:-translate-y-36 -translate-y-48 drop-shadow-md -z-10 transition-transform'
								src={RoomImage}
								alt='registration-image'
							></img>
							<Separator className='my-4' />
							<h4 className='text-lg font-medium leading-none mb-4'>Rooms</h4>
							<div className='flex w-full items-center justify-center mx-auto'>
								<Room />
							</div>
						</>
					)}
				</div>
				<Footer />
			</div>
		</>
	);
};

export default MainPage;
