import React, { useEffect, useState } from 'react';
import { RoomInfo, HotelInfo } from '../Posts';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';
import { BiBath, BiBed, BiEdit, BiTime, BiTv } from 'react-icons/bi';
import { Button } from './ui/button';
import AddRoomButton from '../components/AddRoomButton';

const Rooms = () => {
	const registrationID = HotelInfo().id;
	const roomInfo = RoomInfo(registrationID);

	const [fetchedRoomInfo, setFetchedRoomInfo] = useState([]);

	useEffect(() => {
		setFetchedRoomInfo(roomInfo);
	}, [roomInfo]);

	return (
		<div className='grid 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 justify-evenly items-center content-center w-full gap-4'>
			{fetchedRoomInfo.map((room, index) => {
				return (
					<Card
						className={`text-lg h-fit 2xl:hover:scale-[102%] transition-all items-center justify-center ${
							index > 5 ? 'w-56' : 'w-full'
						}`}
						key={index}
					>
						<CardHeader>
							<CardTitle className='flex w-full justify-between items-start'>
								{room.name}
								<Button className=' h-fit m-0 p-0 bg-transparent shadow-none 2xl:hover:scale-[105%] 2xl:hover:opacity-70 hover:bg-transparent transition-all self-start'>
									<BiEdit className=' text-black' />
								</Button>
							</CardTitle>
							<CardDescription>{room.roomType} Room</CardDescription>
							<Separator />
							<CardContent className='p-0 text-black-600 flex flex-col w-full items-start gap-2 justify-start'>
								<span className='flex items-center gap-2'>
									<BiBed />
									{room.bedNumber}
								</span>
								<span className='flex items-center gap-2'>
									<BiTv />
									{room.tvInclusion}
								</span>
								<span className='flex items-center gap-2'>
									<BiBath />
									{room.crInclusion}
								</span>
								<span className='flex items-center gap-2 justify-right'>
									<BiTime className='' />
									&nbsp;{'12H'}
									<span className='font-thin'> | </span>₱{room.price12h}
								</span>
								<span className='flex items-center gap-2 justify-right'>
									<BiTime /> {'24H'}
									<span className='font-thin'> | </span>₱{room.price24h}
								</span>
							</CardContent>
						</CardHeader>
						<CardFooter className='flex sm:flex-row flex-col gap-4 justify-between'>
							<Button className='w-full'>Book</Button>
						</CardFooter>
					</Card>
				);
			})}
			<AddRoomButton />
		</div>
	);
};

export default Rooms;
