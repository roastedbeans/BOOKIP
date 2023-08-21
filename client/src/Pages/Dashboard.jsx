/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Navbar from '../components/Navbar';
import HotelDisplay from '../components/HotelDisplay';
import Room from '../components/Room';
import HasContent from '../Posts';
import { Separator } from '../components/ui/separator';

const MainPage = () => {
	return (
		<>
			<div className='w-full h-screen self-start'>
				<Navbar />
				<div className='w-full h-fit pt-5 sm:px-10 px-2 m-0 flex flex-col items-center justify-center'>
					{HasContent() ? <HotelDisplay /> : <></>}
					<Separator className='my-4' />
					<h4 className='text-lg font-medium leading-none mb-4'>Rooms</h4>
					<div className='flex w-full items-center justify-center'>{HasContent() ? <Room /> : <></>}</div>
				</div>
			</div>
		</>
	);
};

export default MainPage;
