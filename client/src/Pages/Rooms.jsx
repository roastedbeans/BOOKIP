import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import RoomForm from '../components/RoomForm';
import RegistrationForm from '@/components/RegistrationForm';
import HasContent from '../Posts';

const Rooms = () => {
	return (
		<>
			<div className='w-full h-screen self-start'>
				<Navbar />
				<div className='w-full h-fit p-10 m-auto flex items-center justify-center'></div>
			</div>
		</>
	);
};

export default Rooms;
