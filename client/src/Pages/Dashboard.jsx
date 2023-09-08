/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import HotelDisplay from '@/components/HotelDisplay';
import { HotelInfo } from '@/Posts.jsx';
import Room from '@/components/Room';
import { Separator } from '@/components/ui/separator';
import RegistrationForm from '@/components/RegistrationForm';
import Footer from '@/components/Footer';

const MainPage = () => {
	const hotelInfo = HotelInfo();
	return (
		<>
			<div className='w-full h-screen self-start'>
				<Navbar />
				<div className='w-full h-fit pt-5 sm:px-10 px-2 m-0 flex flex-col items-center justify-center'>
					{hotelInfo.length === 0 ? <RegistrationForm /> : <HotelDisplay />}
					<Separator className='my-4' />
					{hotelInfo.length === 0 ? <></> : <h4 className='text-lg font-medium leading-none mb-4'>Rooms</h4>}
					<div className='flex w-full items-center justify-center mx-auto'>
						{hotelInfo.length === 0 ? <></> : <Room />}
					</div>
				</div>
				<Footer />
			</div>
		</>
	);
};

export default MainPage;
