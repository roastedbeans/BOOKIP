import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { useUser } from '@clerk/clerk-react';
import { registerForm } from '../formValue';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { host } from '../Posts';
import RegImage from '../assets/registration-image.svg';
import BgImage from '../assets/background-vertical.jpg';
import axios from 'axios';

export default function HotelForm() {
	const { user } = useUser();
	const [hotelInfo, setHotelInfo] = useState(registerForm);
	const [show, setShow] = useState(false);
	const [typing, setTyping] = useState(false);

	const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

	const onHandleChange = async (e) => {
		setHotelInfo({ ...hotelInfo, [e.target.id]: e.target.value, userID: user.id });
		setTyping(false);
		await delay(100);
		setShow(true);
		setTyping(true);
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		try {
			await axios.post(`${host}/registrations`, hotelInfo).then((response) => {
				console.log(response.data);
			});
		} catch (err) {
			console.log(err);
		}
		setHotelInfo(registerForm);
		window.location.reload();
	};

	return (
		<div className='w-full h-fit flex items-center justify-center md:flex-row-reverse flex-col md:mb-0 mb-6 md:pt-10'>
			<img
				className='md:hidden block fixed -z-10 object-cover h-full w-full top-0'
				src={BgImage}
				alt='background image'
			/>
			<input
				src={RegImage}
				alt='registration-image'
				type={'image'}
				disabled={show}
				className={`md:block hidden select-none outline-none md:w-[560px] w-60 h-fit drop-shadow-md 2xl:hover:translate-x-2 2xl:hover:-translate-y-4 enabled:scale-0 disabled:scale-100 transition-transform duration-500 ${
					typing ? '-translate-y-4' : 'translate-y-0'
				}`}
			/>

			<Card
				className={`md:w-fit w-full transition-transform duration-300 bg-gradient-to-bl from-[#f8f6fe] to-white ${
					show ? 'md:translate-x-[0%]' : 'md:translate-x-[50%]'
				}`}
			>
				<CardHeader>
					<CardTitle>Register Hotel</CardTitle>
					<CardDescription>Please fill-up the form</CardDescription>
				</CardHeader>
				<input
					src={RegImage}
					alt='registration-image'
					type={'image'}
					disabled={show}
					className={`self-center md:hidden block select-none outline-none w-full disabled:h-fit px-6 drop-shadow-md enabled:scale-0 enabled:absolute disabled:relative disabled:scale-100 transition-transform duration-500 ${
						typing ? '-translate-y-4' : 'translate-y-0'
					}`}
				/>
				<CardContent>
					<form onSubmit={onSubmit}>
						<div className='grid w-full items-center gap-4'>
							<div className='flex flex-col space-y-1.5'>
								<Label htmlFor='hotelName'>Hotel Name</Label>
								<Input
									id='hotelName'
									name='hotelName'
									type='text'
									placeholder='Enter hotel name'
									value={hotelInfo?.hotelName}
									required
									onChange={onHandleChange}
								/>
							</div>
							<div className='flex flex-col space-y-1.5'>
								<Label htmlFor='contactNumber'>Contact Number</Label>
								<Input
									id='contactNumber'
									name='contactNumber'
									type='number'
									placeholder='Enter contact number'
									value={hotelInfo?.contactNumber}
									required
									onChange={onHandleChange}
								/>
							</div>
							<div className='flex flex-col space-y-1.5'>
								<Label htmlFor='street'>Street Address</Label>
								<Input
									id='street'
									name='street'
									type='text'
									placeholder='Enter contact number'
									value={hotelInfo?.street}
									required
									onChange={onHandleChange}
								/>
							</div>
							<div className='flex gap-4 sm:flex-row flex-col'>
								<div className='flex flex-col space-y-1.5 w-full'>
									<Label htmlFor='city'>City</Label>
									<Input
										id='city'
										name='city'
										onChange={onHandleChange}
										value={hotelInfo?.city}
										type='text'
										placeholder='Enter city'
										required
									/>
								</div>
								<div className='flex flex-col space-y-1.5 w-full'>
									<Label htmlFor='province'>Province</Label>
									<Input
										id='province'
										name='province'
										onChange={onHandleChange}
										value={hotelInfo?.province}
										type='text'
										placeholder='Enter province'
										required
									/>
								</div>
							</div>
							<div className='flex gap-4 sm:flex-row flex-col '>
								<div className='flex flex-col space-y-1.5 w-full'>
									<Label htmlFor='country'>Country</Label>
									<Input
										id='country'
										name='country'
										onChange={onHandleChange}
										value={hotelInfo?.country}
										type='text'
										placeholder='Enter country'
										required
									/>
								</div>
								<div className='flex flex-col space-y-1.5 w-full'>
									<Label htmlFor='zipCode'>Zip Code</Label>
									<Input
										id='zipCode'
										name='zipCode'
										onChange={onHandleChange}
										value={hotelInfo?.zipCode}
										type='number'
										placeholder='Enter zip code'
										required
									/>
								</div>
							</div>
						</div>
						<CardFooter className='flex justify-end m-0 p-0 mt-4'>
							<Button
								className='hover:opacity-80 bg-gradient-to-tr from-[#876eb9] to-[#453369] transition-opacity'
								type='submit'
							>
								Register
							</Button>
						</CardFooter>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
