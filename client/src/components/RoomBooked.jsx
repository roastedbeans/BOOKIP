import React from 'react';
import { CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';
import { BiCalendar, BiMoney, BiPhone } from 'react-icons/bi';
import { BookingInfoByID } from '@/Posts';
import FlipCountdown from '@rumess/react-flip-countdown';
import { Label } from './ui/label';
import { AvatarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { host } from '@/Posts';
import axios from 'axios';

const RoomBooked = (room) => {
	room = room.room;
	const bookingInfo = BookingInfoByID(room.id);
	let inTime = format(new Date(bookingInfo?.checkInDate || new Date()), 'PP');
	const handleOnTimeUp = async () => {
		try {
			await axios.put(`${host()}/posts/bookings/room/${room.id}`, { status: false });
			await axios.put(`${host()}/posts/room/id/${room.id}`, { status: false });
		} catch (err) {
			console.log(err);
		}
		window.location.reload();
	};
	return (
		<div className='w-full h-full justify-between'>
			<CardHeader>
				<CardTitle className='inline-flex w-full h-4 justify-start items-start bg-none text-white gap-2'>
					{room.name} <Separator orientation='vertical' /> {'Booked'}
				</CardTitle>
				<CardDescription className='text-white inline-flex items-center gap-2'>
					<BiCalendar />
					{inTime}
				</CardDescription>
				<Separator />
			</CardHeader>
			<CardContent className='text-black-600 flex flex-col items-start justify-center h-fit gap-1'>
				<div className='flex items-center w-full h-full'>
					{bookingInfo?.status && (
						<FlipCountdown
							titlePosition='bottom'
							theme={'dark'}
							size={'small'}
							hideYear={true}
							hideMonth={true}
							hideDay={false}
							hideSecond={true}
							endAt={bookingInfo?.checkOutDate}
							onTimeUp={handleOnTimeUp}
						/>
					)}
				</div>
				<div className='flex flex-col gap-2 h-fit'>
					<Label className='flex items-center gap-2 justify-right text-base'>
						<AvatarIcon />
						{bookingInfo?.customerName}
					</Label>
					<Label className='flex items-center gap-2 justify-right text-base'>
						<BiPhone />
						{bookingInfo?.customerPhone}
					</Label>
					<Label className='flex items-center gap-2 justify-right text-base'>
						<BiMoney />
						{bookingInfo?.price}
					</Label>
				</div>
			</CardContent>
		</div>
	);
};

export default RoomBooked;
