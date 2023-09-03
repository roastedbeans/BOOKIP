import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '@clerk/clerk-react';
import { Separator } from './ui/separator';
import { Card } from './ui/card';
import { HotelInfo } from '../Posts';
import { Button } from './ui/button';
import { BiEdit } from 'react-icons/bi';
import { Modal } from 'react-responsive-modal';
import HotelFormUpdate from './RegistrationFormUpdate';

const HotelDisplay = () => {
	const [selectedHotel, setSelectedHotel] = useState([]);
	const [open, setOpen] = React.useState(false);
	const onCloseModal = () => setOpen(false);
	const onOpenModal = (hotel) => {
		setSelectedHotel(hotel);
		setOpen(true);
	};
	const hotelInfo = HotelInfo();
	const { hotelName, contactNumber, street, city, province, country, zipCode } = hotelInfo;

	return (
		<>
			<Card className='2xs:w-full w-fit h-fit rounded-lg p-4 2xl:hover:scale-[101%] transition-all bg-white'>
				<div className='space-y-1'>
					<div className='w-full flex justify-between'>
						<h4 className='text-lg font-medium leading-none'>{hotelName}</h4>
						<Button
							onClick={() => onOpenModal(hotelInfo)}
							className=' h-fit m-0 p-0 bg-transparent shadow-none 2xl:hover:scale-[105%] 2xl:hover:opacity-70 hover:bg-transparent transition-all self-start'
						>
							<BiEdit className=' text-black' />
						</Button>
					</div>

					<div className='sm:flex-row flex-col flex sm:h-5 items-start sm:space-x-4 text-sm'>
						<p className='text-sm text-muted-foreground '>{contactNumber}</p>
						<Separator orientation='vertical' className='sm:block hidden' />
						<p className='text-sm text-muted-foreground'>{street}</p>
					</div>
				</div>
				<Separator className='my-4' />
				<div className='sm:flex-row flex-col flex sm:h-5 items-start sm:space-x-4 text-sm'>
					<div>{city}</div>
					<Separator orientation='vertical' className='sm:block hidden' />
					<div>{province}</div>
					<Separator orientation='vertical' className='sm:block hidden' />
					<div>{country}</div>
					<Separator orientation='vertical' className='sm:block hidden' />
					<div>{zipCode}</div>
				</div>
			</Card>
			<Modal
				open={open}
				onClose={onCloseModal}
				center
				styles={{
					modal: {
						backgroundColor: 'white',
						borderRadius: '16px',
					},
				}}
			>
				<HotelFormUpdate hotel={selectedHotel} />
			</Modal>
		</>
	);
};

export default HotelDisplay;
