import React from 'react';
import HistoryTable from '@/components/HistoryTable';
import HotelDisplay from '@/components/HotelDisplay';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RegistrationForm from '@/components/RegistrationForm';
import { HotelInfo } from '@/Posts';
import { Separator } from '@/components/ui/separator';

const HistoryPage = () => {
	const hotelInfo = HotelInfo();

	return (
		<div className='w-full h-fit self-start'>
			<Navbar />
			<div className='w-full min-h-screen pt-5 sm:px-10 px-2 m-0 flex flex-col items-center justify-start '>
				{hotelInfo.length === 0 ? <RegistrationForm /> : <HotelDisplay />}
				<Separator className='my-4' />
				{hotelInfo.length === 0 ? <></> : <h4 className='text-lg font-medium leading-none mb-4'>Booking History</h4>}
				<div className='flex w-full items-center justify-center mx-auto'>
					{hotelInfo.length === 0 ? <></> : <HistoryTable />}
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default HistoryPage;
