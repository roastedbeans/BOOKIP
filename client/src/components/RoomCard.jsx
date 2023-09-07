import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';
import { BiBath, BiBed, BiTime, BiTv } from 'react-icons/bi';
import { Button } from './ui/button';
import RoomFormUpdate from './RoomFormUpdate';
import { Label } from './ui/label';

const RoomCard = (room, index, onOpenModal) => {
	return (
		<Card
			className={`text-lg h-[346px] 2xl:hover:scale-[102%] transition-all items-center justify-between flex flex-col p-2 ${
				index > 5 ? 'w-56' : 'w-full'
			}`}
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
};

export default RoomCard;
