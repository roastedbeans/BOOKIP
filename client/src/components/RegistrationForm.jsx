'use client';

import * as React from 'react';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { useUser } from '@clerk/clerk-react';
import { registerForm } from '../formValue';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import axios from 'axios';

export default function RoomForm() {
	const { user } = useUser();

	const [hotelInfo, setHotelInfo] = useState(registerForm);

	const onHandleChange = (e) => {
		setHotelInfo({ ...hotelInfo, [e.target.id]: e.target.value, userID: user.id });
	};

	console.log(hotelInfo);
	console.log(user.id);

	const onSubmit = (e) => {
		e.preventDefault();
		try {
			axios.post('http://localhost:5000/posts/registration', hotelInfo).then((response) => {
				console.log(response.data);
			});
		} catch (err) {
			console.log(err);
		}
		setHotelInfo(registerForm);
	};

	return (
		<Card className='w-fit'>
			<CardHeader>
				<CardTitle>Register Hotel</CardTitle>
				<CardDescription>Please fill-up the form</CardDescription>
			</CardHeader>
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
								value={hotelInfo.hotelName}
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
								value={hotelInfo.contactNumber}
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
								value={hotelInfo.street}
								required
								onChange={onHandleChange}
							/>
						</div>
						<div className='flex gap-4 sm:flex-row flex-col'>
							<div className='flex flex-col space-y-1.5'>
								<Label htmlFor='city'>City</Label>
								<Input
									id='city'
									name='city'
									onChange={onHandleChange}
									value={hotelInfo.city}
									type='text'
									placeholder='Enter city'
									required
								/>
							</div>
							<div className='flex flex-col space-y-1.5'>
								<Label htmlFor='province'>Province</Label>
								<Input
									id='province'
									name='province'
									onChange={onHandleChange}
									value={hotelInfo.province}
									type='text'
									placeholder='Enter province'
									required
								/>
							</div>
						</div>
						<div className='flex gap-4 sm:flex-row flex-col'>
							<div className='flex flex-col space-y-1.5'>
								<Label htmlFor='country'>Country</Label>
								<Input
									id='country'
									name='country'
									onChange={onHandleChange}
									value={hotelInfo.country}
									type='text'
									placeholder='Enter country'
									required
								/>
							</div>
							<div className='flex flex-col space-y-1.5'>
								<Label htmlFor='zipCode'>Zip Code</Label>
								<Input
									id='zipCode'
									name='zipCode'
									onChange={onHandleChange}
									value={hotelInfo.zipCode}
									type='number'
									placeholder='Enter zip code'
									required
								/>
							</div>
						</div>
					</div>
					<CardFooter className='flex justify-between m-0 p-0 mt-4'>
						<Button
							type='button'
							variant='outline'>
							Cancel
						</Button>
						<Button type='submit'>Register</Button>
					</CardFooter>
				</form>
			</CardContent>
		</Card>
	);
}
