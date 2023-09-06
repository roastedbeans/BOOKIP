import React, { useEffect, useState } from 'react';
import { RoomInfo, HotelInfo } from '../Posts';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';
import { BiBath, BiBed, BiTime, BiTv } from 'react-icons/bi';
import { Button } from './ui/button';
import { Modal } from 'react-responsive-modal';
import BookForm from './BookForm';
import RoomFormUpdate from './RoomFormUpdate';
import AddRoomButton from './AddRoomButton';
import { modalCustomStyles } from '@/themes';
import { Label } from './ui/label';

const Rooms = () => {
	const registrationID = HotelInfo();
	const roomInfo = RoomInfo(registrationID.id);
	const [fetchedRoomInfo, setFetchedRoomInfo] = useState([]);
	const [selectedRoom, setSelectedRoom] = useState([]);
	const [open, setOpen] = React.useState(false);
	const onCloseModal = () => setOpen(false);
	const onOpenModal = (room) => {
		setSelectedRoom(room);
		setOpen(true);
	};

	useEffect(() => {
		setFetchedRoomInfo(roomInfo);
	}, [roomInfo]);

	return (
		<div className='grid 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 justify-evenly items-center content-center w-full gap-4'>
			{fetchedRoomInfo.map((room, index) => {
				return (
					<Card
						className={`text-lg h-[346px] 2xl:hover:scale-[102%] transition-all items-center justify-between flex flex-col p-2 ${
							index > 5 ? 'w-56' : 'w-full'
						}`}
						key={index}
					>
						<div className='w-full h-full justify-between'>
							<CardHeader>
								<CardTitle className='flex w-full justify-between items-start bg-none'>
									{room.name}
									<RoomFormUpdate room={room} />
								</CardTitle>
								<CardDescription>{room.roomType} Room</CardDescription>
								<Separator />
							</CardHeader>
							<CardContent className='text-black-600 flex flex-col h-fit items-start gap-2'>
								<Label className='flex items-center gap-2 text-base'>
									<BiBed />
									{room.bedNumber}
								</Label>
								<Label className='flex items-center gap-2 text-base'>
									<BiTv />
									{room.tvInclusion}
								</Label>
								<Label className='flex items-center gap-2 text-base'>
									<BiBath />
									{room.crInclusion}
								</Label>
								<Label className='flex items-center gap-2 justify-right text-base'>
									<BiTime className='' />
									&nbsp;{'12H'}
									<Label className='font-thin'> | </Label>₱{room.price12h}
								</Label>
								<Label className='flex items-center gap-2 justify-right text-base'>
									<BiTime /> {'24H'}
									<Label className='font-thin'> | </Label>₱{room.price24h}
								</Label>
							</CardContent>
						</div>
						<CardFooter className='flex sm:flex-row flex-col w-full text-base'>
							<Button className='w-full' onClick={() => onOpenModal(room)}>
								Book
							</Button>
						</CardFooter>
					</Card>
				);
			})}
			<AddRoomButton />
			<Modal open={open} onClose={onCloseModal} center styles={modalCustomStyles}>
				<BookForm room={selectedRoom} />
			</Modal>
		</div>
	);
};

export default Rooms;
