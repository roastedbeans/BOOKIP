import React from 'react';
import Navbar from '../components/Navbar';
import RoomForm from '../components/RoomForm';

const Rooms = () => {
	return (
		<>
			<div className='w-full h-screen self-start'>
				<Navbar />
				<div className='w-full h-fit p-10 flex items-center justify-center'>
					<div>
						<RoomForm />
					</div>
				</div>
			</div>
		</>
	);
};

export default Rooms;
