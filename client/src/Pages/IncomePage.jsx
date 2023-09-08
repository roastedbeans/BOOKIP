import React from 'react';
import IncomeTable from '@/components/IncomeTable';
import ExpensesTable from '@/components/ExpensesTable';
import ExpensesTableSample from '@/components/ExpensesTableSample';
import HotelDisplay from '@/components/HotelDisplay';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RegistrationForm from '@/components/RegistrationForm';
import { HotelInfo } from '@/Posts';
import { Separator } from '@/components/ui/separator';
import PageOngoing from './PageOngoing';

const IncomePage = () => {
	const hotelInfo = HotelInfo();

	return (
		<div className='w-full h-fit self-start'>
			<Navbar />
			<div className='w-full min-h-screen pt-5 sm:px-10 px-2 m-0 flex flex-col items-center justify-start'>
				{hotelInfo.length === 0 ? <RegistrationForm /> : <HotelDisplay />}
				<Separator className='my-4' />
				{hotelInfo.length === 0 ? <></> : <PageOngoing />}
				<div className='hidden'>
					{hotelInfo.length === 0 ? <></> : <h4 className='text-lg font-medium leading-none mb-4'>Income Statement</h4>}
					<div className='flex w-full items-center justify-center mx-auto'>
						{hotelInfo.length === 0 ? <></> : <IncomeTable />}
					</div>
					<Separator className='my-4' />
					{hotelInfo.length === 0 ? <></> : <h4 className='text-lg font-medium leading-none mb-4'>Expense Report</h4>}
					<div className='flex w-full items-center justify-center mx-auto'>
						{/* {hotelInfo.length === 0 ? <></> : <ExpensesTable />} */}
						{hotelInfo.length === 0 ? <></> : <ExpensesTableSample />}
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default IncomePage;
