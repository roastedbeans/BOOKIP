import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from './ui/card';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import Select from 'react-select';
import axios from 'axios';
import { bookingForm, hoursOptions } from '@/formValue';
import { themes, customStyles } from '@/themes';

const BookForm = (room) => {
	const [bookInfo, setBookInfo] = useState(bookingForm);
	const [dateIn, setInDate] = useState();
	const [dateOut, setOutDate] = useState();
	const [selectedHours, setSelectedHours] = useState(hoursOptions[0]);

	const onHandleHours = (e) => {
		setBookInfo({ ...bookInfo, hours: e.value });
		setSelectedHours(e);
		setOutDate(null);
	};

	const onHandleChange = (e) => {
		setBookInfo({ ...bookInfo, [e.target.id]: e.target.value, roomID: room.id });
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		try {
			await axios.post('http://localhost:5000/posts/booking', bookInfo).then((response) => {
				console.log(response.data);
			});
		} catch (err) {
			console.log(err);
		}
		setBookInfo(bookingForm);
		window.location.reload();
	};

	return (
		<Card className='w-fit border-0 shadow-none'>
			<CardHeader>
				<CardTitle>Room Booking</CardTitle>
				<CardDescription>Please fill-up customer information</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={onSubmit}>
					<div className='grid w-full items-center gap-4'>
						<div className='flex flex-col space-y-1.5'>
							<Label htmlFor='customerName'>Customer Name</Label>
							<Input
								id='customerName'
								name='customerName'
								type='text'
								placeholder='Enter full name'
								value={bookInfo.customerName}
								required
								onChange={onHandleChange}
							/>
						</div>
						<div className='flex flex-col space-y-1.5'>
							<Label htmlFor='customerPhone'>Contact Number</Label>
							<Input
								id='customerPhone'
								name='customerPhone'
								type='number'
								placeholder='Enter contact number'
								value={bookInfo.customerPhone}
								required
								onChange={onHandleChange}
							/>
						</div>
						<div className='flex flex-col space-y-1.5 text-sm shadow-sm'>
							<Label htmlFor='hours'>Number of Hours</Label>
							<Select
								isSearchable={false}
								styles={customStyles}
								theme={themes}
								id='hours'
								options={hoursOptions}
								onChange={onHandleHours}
								defaultValue={hoursOptions[0]}
								value={selectedHours}
								placeholder='Select CR inclusion'
								required
							></Select>
						</div>
						<div className='flex sm:flex-row flex-col gap-4 w-full'>
							<div className='flex flex-col space-y-1.5 w-full'>
								<Label htmlFor='street'>Check-in Date</Label>
								<Popover>
									<PopoverTrigger asChild>
										<Button
											variant={'outline'}
											className={cn(
												'justify-start text-left font-normal',
												!dateIn && 'text-muted-foreground',
												selectedHours.value === '12 hours' ? 'w-full' : 'sm:w-48'
											)}
										>
											<CalendarIcon className='mr-2 h-4 w-4' />
											{dateIn ? format(dateIn, 'yyyy-MM-dd') : <span>Pick a date</span>}
										</Button>
									</PopoverTrigger>
									<PopoverContent className='w-full p-0' align='center'>
										<Calendar mode='single' selected={dateIn} onSelect={setInDate} initialFocus />
									</PopoverContent>
								</Popover>
							</div>
							{selectedHours.value === '24 hours' && (
								<div className='flex flex-col space-y-1.5 w-full'>
									<Label htmlFor='street'>Check-out Date</Label>
									<Popover>
										<PopoverTrigger asChild>
											<Button
												variant={'outline'}
												className={cn(
													' justify-start text-left font-normal sm:w-48',
													!dateOut && 'text-muted-foreground'
												)}
											>
												<CalendarIcon className='mr-2 h-4 w-4' />
												{dateOut ? format(dateOut, 'yyyy-MM-dd') : <span>Pick a date</span>}
											</Button>
										</PopoverTrigger>
										<PopoverContent className='w-full p-0' align='center'>
											<Calendar mode='single' selected={dateOut} onSelect={setOutDate} initialFocus />
										</PopoverContent>
									</Popover>
								</div>
							)}
						</div>
					</div>
					<CardFooter className='flex justify-end m-0 p-0 mt-4'>
						<Button type='submit'>Book Now</Button>
					</CardFooter>
				</form>
			</CardContent>
		</Card>
	);
};

export default BookForm;
