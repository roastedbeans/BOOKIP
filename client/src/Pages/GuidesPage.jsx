/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import GuidesImage from '../assets/guides-image.svg';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardTitle, CardHeader, CardContent } from '@/components/ui/card';
import Hotel from '../assets/hotel.png';
import Booking from '../assets/booking.png';
import History from '../assets/history.png';
import Income from '../assets/income.png';
import Contacts from '../assets/contacts.png';
import Tips from '../assets/tips.png';

const GuidesPage = () => {
	return (
		<div className='w-full h-fit'>
			<Navbar />
			<div className='bg-white flex flex-col gap-10 items-center pt-10 pb-20'>
				<div className='flex items-center justify-center'>
					<img src={GuidesImage} alt='guides-image' className='w-32' />
					<h1 className='text-2xl font-semibold mb-4'>BOOKIP Guide</h1>
				</div>
				<div className='flex flex-wrap items-center justify-evenly w-full lg:gap-20 gap-10 px-4'>
					<Card className='items-center rounded-3xl bg-gradient-to-t from-primaryColor to-secondaryColor drop-shadow-shadow-purple w-80 h-[620px] text-white hover:-translate-y-4 transition-transform'>
						<img src={Hotel} alt='Hotel' className='w-fit h-72 m-0 mb-8' />
						<CardHeader className='items-center'>
							<CardTitle>Register Your Hotel</CardTitle>
						</CardHeader>
						<CardContent className='text-sm leading-6 mx-0 px-8 w-full items-center'>
							<ul className=' list-disc flex flex-col gap-2 w-full'>
								<li>Fill in Details: Enter your hotel's name, location, contact information, and amenities.</li>
								<li>Submit: Send your registration.</li>
								<li>Approval: After approval, your hotel will be listed, and you can start accepting bookings.</li>
							</ul>
						</CardContent>
					</Card>
					<Card className='items-center rounded-3xl bg-gradient-to-t from-primaryColor to-secondaryColor drop-shadow-shadow-purple w-80 h-[620px] text-white hover:-translate-y-4 transition-transform'>
						<img src={Booking} alt='Booking' className='w-fit h-72 m-0 mb-8' />
						<CardHeader className='items-center'>
							<CardTitle>Manage Bookings</CardTitle>
						</CardHeader>
						<CardContent className='text-sm leading-6 mx-0 px-8 w-full items-center'>
							<ul className=' list-disc flex flex-col gap-2 w-full'>
								<li>Access Booking System: Click on "Manage Bookings."</li>
								<li>Manage Availability: Set room availability and pricing.</li>
								<li>Handle Reservations: Confirm, modify, or cancel bookings.</li>
							</ul>
						</CardContent>
					</Card>
					<Card className='items-center rounded-3xl bg-gradient-to-t from-primaryColor to-secondaryColor drop-shadow-shadow-purple w-80 h-[620px] text-white hover:-translate-y-4 transition-transform'>
						<img src={History} alt='History' className='w-fit h-72 m-0 mb-8' />
						<CardHeader className='items-center'>
							<CardTitle>Booking History</CardTitle>
						</CardHeader>
						<CardContent className='text-sm leading-6 mx-0 px-8 w-full items-center'>
							<ul className=' list-disc flex flex-col gap-2 w-full'>
								<li>Click "History": Access a detailed record of all past bookings.</li>
								<li>Review Details: Check past check-in/check-out dates and guest information.</li>
								<li>Gain Insights: Use this data for valuable insights and better management.</li>
							</ul>
						</CardContent>
					</Card>
					<Card className='items-center rounded-3xl bg-gradient-to-t from-primaryColor to-secondaryColor drop-shadow-shadow-purple w-80 h-[620px] text-white hover:-translate-y-4 transition-transform'>
						<img src={Income} alt='Income' className='w-fit h-72 m-0 mb-8' />
						<CardHeader className='items-center'>
							<CardTitle>Income Statement</CardTitle>
						</CardHeader>
						<CardContent className='text-sm leading-6 mx-0 px-8 w-full items-center'>
							<ul className=' list-disc flex flex-col gap-2 w-full'>
								<li>Click "Income Statement": Examine your hotel's financial performance.</li>
								<li>Click "Financial Insights": Examine your hotel's financial performance.</li>
								<li>
									Make Informed Decisions: Use financial data to make informed decisions about your hotel's finances.
								</li>
							</ul>
						</CardContent>
					</Card>
					<Card className='items-center rounded-3xl bg-gradient-to-t from-primaryColor to-secondaryColor drop-shadow-shadow-purple w-80 h-[620px] text-white hover:-translate-y-4 transition-transform'>
						<img src={Tips} alt='tips' className='w-fit h-72 m-0 mb-8' />
						<CardHeader className='items-center'>
							<CardTitle>Helpful Tips</CardTitle>
						</CardHeader>
						<CardContent className='text-sm leading-6 mx-0 px-8 w-full items-center'>
							<ul className='list-disc pl-4'>
								<li>Keep your hotel's information accurate in the registration.</li>
								<li>Regularly update room availability and pricing.</li>
								<li>Utilize booking history and financial insights to improve your hotel's performance.</li>
							</ul>
						</CardContent>
					</Card>
					<Card className='items-center rounded-3xl bg-gradient-to-t from-primaryColor to-secondaryColor drop-shadow-shadow-purple w-80 h-[620px] text-white hover:-translate-y-4 transition-transform'>
						<img src={Contacts} alt='Contacts' className='w-fit h-72 m-0 mb-8' />
						<CardHeader className='items-center'>
							<CardTitle>Need Help?</CardTitle>
						</CardHeader>
						<CardContent className='text-sm leading-6 mx-0 px-8 w-full items-center'>
							<p>
								If you have questions or encounter any issues, our customer support team is here to assist you. We're
								dedicated to helping you make the most of our Hotel Booking System.
							</p>
						</CardContent>
					</Card>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default GuidesPage;
