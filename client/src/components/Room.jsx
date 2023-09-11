import React, { useEffect, useState } from 'react';
import { RoomInfo, HotelInfo } from '../Posts';
import { Card, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { Modal } from 'react-responsive-modal';
import BookForm from './BookForm';
import AddRoomButton from './AddRoomButton';
import { modalCustomStyles } from '@/themes';
import RoomContent from './RoomContent';
import RoomBooked from './RoomBooked';
import { host } from '@/Posts';
import axios from 'axios';

const Rooms = () => {
	const registrationID = HotelInfo();
	const fetchedRoomInfo = RoomInfo(registrationID.id);

	const [selectedRoom, setSelectedRoom] = useState([]);
	const [open, setOpen] = useState(false);

	const onCloseModal = () => {
		setSelectedRoom([]);
		setOpen(false);
	};

	const onOpenModal = (room) => {
		setSelectedRoom(room);
		setOpen(true);
	};

	const onBookingDone = async (room) => {
		try {
			await axios.put(`${host}/bookings/room/${room.id}`, { status: false });
			await axios.put(`${host}/rooms/id/${room.id}`, { status: false });
		} catch (err) {
			console.log(err);
		}

		window.location.reload();
	};

	return (
		<div className=' inline-flex flex-wrap flex-row justify-center w-full h-full gap-4 '>
			{fetchedRoomInfo.map((room, index) => {
				return (
					<Card
						key={index}
						className={`sm:w-60 w-full text-lg h-[346px] 2xl:hover:scale-[102%]  2xl:hover:-translate-y-4 2xl:hover:shadow-xl transition-all items-center justify-center flex flex-col p-1
							${
								room.status
									? 'booked-card-opacity backdrop-blur-md text-white'
									: 'bg-[rgba(255,255,255,0.6)] backdrop-blur-md text-darkColor'
							}`}
					>
						{room.status ? (
							<>
								<RoomBooked room={room} />
								<CardFooter className='flex sm:flex-row flex-col h-fit w-full text-base'>
									<Button className='w-full' onClick={() => onBookingDone(room)}>
										Done
									</Button>
								</CardFooter>
							</>
						) : (
							<>
								<RoomContent room={room} />
								<CardFooter className='flex sm:flex-row flex-col h-fit w-full text-base'>
									<Button className='w-full' onClick={() => onOpenModal(room)}>
										Book
									</Button>
								</CardFooter>
							</>
						)}
					</Card>
				);
			})}
			<AddRoomButton />
			<div className='w-60'></div>
			<div className='w-60'></div>
			<div className='w-60'></div>
			<div className='w-60'></div>
			<div className='w-60'></div>
			<Modal open={open} onClose={onCloseModal} center styles={modalCustomStyles}>
				<BookForm room={selectedRoom} />
			</Modal>
		</div>
	);
};

export default Rooms;
