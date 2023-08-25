/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import HotelDisplay from '../components/HotelDisplay';
import { HotelInfo } from '../Posts.jsx';
import Room from '../components/Room';
import { Separator } from '../components/ui/separator';
import RegistrationForm from '../components/RegistrationForm';

const MainPage = () => {
	return (
		<>
			<div className='w-full h-screen self-start'>
				<Navbar />
				<div className='w-full h-fit pt-5 sm:px-10 px-2 m-0 flex flex-col items-center justify-center'>
					{HotelInfo() == [] ? <HotelDisplay /> : <RegistrationForm />}
					<Separator className='my-4' />
					{HotelInfo() == [] ? <h4 className='text-lg font-medium leading-none mb-4'>Rooms</h4> : <></>}
					<div className='flex w-full items-center justify-center'>{HotelInfo() == [] ? <Room /> : <></>}</div>
				</div>
			</div>
		</>
	);
};

export default MainPage;
