import React from 'react';
import IncomeTable from '@/components/IncomeTable';
import ExpensesTable from '@/components/ExpensesTable';
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
		<div className='w-full h-fit bg-white'>
			<Navbar />
			<div className='w-full h-fit pt-5 pb-20 sm:px-10 px-2 m-0 flex flex-col items-center justify-start'>
				{hotelInfo && hotelInfo.length === 0 ? (
					<RegistrationForm />
				) : (
					<>
						<HotelDisplay />
						<Separator className='my-4' />
						{/* <PageOngoing /> */}
						<div className='flex flex-col w-full mb-20'>
							<h4 className='text-lg font-medium leading-none mb-4'>Income Statement</h4>
							<div className='flex w-full items-center justify-center'>
								<IncomeTable />
							</div>
							<Separator className='my-4' />
							<h4 className='text-lg font-medium leading-none mb-4'>Expense Report</h4>
							<div className='flex w-full items-center justify-center'>
								<ExpensesTable />
							</div>
						</div>
					</>
				)}
				<Footer />
			</div>
		</div>
	);
};

export default IncomePage;
