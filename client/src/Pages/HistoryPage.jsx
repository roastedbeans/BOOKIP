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
		<div className='w-full h-fit bg-gradient-to-tr md:from-white md:to-white from-white to-[#C7ABFF]'>
			<Navbar />
			<div className='w-full h-fit pt-5 pb-20 sm:px-10 px-2 m-0 flex flex-col items-center'>
				{hotelInfo && hotelInfo.length === 0 ? (
					<RegistrationForm />
				) : (
					<>
						<HotelDisplay />
						<Separator className='my-4' />
						<h4 className='text-lg font-medium leading-none mb-4'>Booking History</h4>
						<div className='flex w-full items-center justify-center mx-auto'>
							<HistoryTable />
						</div>
					</>
				)}
			</div>
			<Footer />
		</div>
	);
};

export default HistoryPage;
