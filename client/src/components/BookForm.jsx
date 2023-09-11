import React, { useEffect, useState } from 'react';
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
import { host } from '@/Posts';
import { themes, customStyles } from '@/themes';

const BookForm = (room) => {
	const [bookInfo, setBookInfo] = useState(bookingForm);
	const [selectedHours, setSelectedHours] = useState();
	const [dateIn, setInDate] = useState();
	const [dateOut, setOutDate] = useState();
	const [roomRate, setRoomRate] = useState(0);

	const onHandleChange = (e) => {
		const currentTime = new Date();
		if (e.target?.id === 'hours') {
			setSelectedHours(e.target?.value);
			if (e.target?.value === '24 hours') {
				setInDate(new Date());
				setOutDate(new Date(currentTime.setHours(currentTime.getHours() + 24)));
			} else {
				setInDate(new Date());
				setOutDate(new Date(currentTime.setHours(currentTime.getHours() + 12)));
			}
		}
		if (e.target?.id === 'checkInDate' && e.target.value != null) {
			e.target.value.setHours(currentTime.getHours(), currentTime.getMinutes(), currentTime.getSeconds());
			setInDate(new Date(e.target?.value));
			if (selectedHours === '12 hours') {
				e.target.value.setHours(currentTime.getHours() + 12, currentTime.getMinutes(), currentTime.getSeconds());
				setOutDate(new Date(e.target.value));
			}
		}

		if (e.target?.id === 'checkOutDate' && e.target.value != null) {
			e.target.value.setHours(currentTime.getHours(), currentTime.getMinutes(), currentTime.getSeconds());
			setOutDate(new Date(e.target.value));
		}

		setBookInfo({
			...bookInfo,
			[e.target?.id]: e.target?.value,
			roomID: room.room.id,
		});
	};

	useEffect(() => {
		if (selectedHours === '12 hours') {
			setRoomRate(room.room.price12h);
		} else if (selectedHours === '24 hours') {
			setRoomRate(room.room.price24h * (dateOut.getDate() - dateIn.getDate()));
		}
		setBookInfo({ ...bookInfo, checkInDate: dateIn, checkOutDate: dateOut, status: true, roomName: room.room.name });
	}, [dateIn, dateOut, selectedHours]);

	useEffect(() => {
		setBookInfo({ ...bookInfo, price: roomRate });
	}, [roomRate]);

	const onSubmit = async (e) => {
		e.preventDefault();
		try {
			await axios.post('${host()}/posts/bookings', bookInfo).then((response) => {
				console.log(response.data);
			});
			await axios.put(`${host()}/posts/room/id/${bookInfo.roomID}`, { status: true });
		} catch (err) {
			console.log(err);
		}
		setBookInfo(bookingForm);
		window.location.reload();
	};
	console.log(bookInfo.roomID);
	return (
		<Card className='w-full border-0 shadow-none'>
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
								autoComplete='off'
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
								autoComplete='off'
								id='customerPhone'
								name='customerPhone'
								type='number'
								placeholder='Enter contact number'
								value={bookInfo.customerPhone}
								required
								onChange={onHandleChange}
							/>
						</div>
						<div className='flex flex-col space-y-1.5 text-sm'>
							<Label htmlFor='hours'>Number of Hours</Label>
							<Select
								className='w-full'
								isSearchable={false}
								styles={customStyles}
								theme={themes}
								id='hours'
								options={hoursOptions}
								onChange={(e) => onHandleChange({ target: { id: 'hours', value: e.value } })}
								value={selectedHours?.value}
								placeholder='Select hours'
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
												'justify-start text-left font-normal w-48',
												!dateIn && 'text-muted-foreground',
												selectedHours === '24 hours' ? 'sm:w-48' : 'w-full'
											)}
										>
											<CalendarIcon className='mr-2 h-4 w-4' />
											{dateIn ? format(dateIn, 'MM-dd-yyyy') : <span>Pick a date</span>}
										</Button>
									</PopoverTrigger>
									<PopoverContent className='w-full p-0' align='center'>
										<Calendar
											disabled={selectedHours == null}
											id='checkInDate'
											name='checkInDate'
											mode='single'
											selected={dateIn}
											onSelect={(e) => onHandleChange({ target: { id: 'checkInDate', value: e } })}
											initialFocus
										/>
									</PopoverContent>
								</Popover>
							</div>
							{selectedHours === '24 hours' && (
								<div className='flex flex-col space-y-1.5 w-full'>
									<Label htmlFor='street'>Check-out Date</Label>
									<Popover>
										<PopoverTrigger asChild>
											<Button
												variant={'outline'}
												className={cn(
													' justify-start text-left font-normal sm:w-48 w-full',
													!dateOut && 'text-muted-foreground'
												)}
											>
												<CalendarIcon className='mr-2 h-4 w-4' />
												{dateOut ? format(dateOut, 'MM-dd-yyyy') : <span>Pick a date</span>}
											</Button>
										</PopoverTrigger>
										<PopoverContent className='w-full p-0' align='center'>
											<Calendar
												id='checkOutDate'
												name='checkOutDate'
												mode='single'
												selected={dateOut}
												onSelect={(e) => onHandleChange({ target: { id: 'checkOutDate', value: e } })}
												initialFocus
											/>
										</PopoverContent>
									</Popover>
								</div>
							)}
						</div>
						<div className='flex flex-col space-y-1.5 text-sm'>
							<Label htmlFor='hours w-full'>Total Price</Label>
							<Input
								disabled={true}
								className='disabled:opacity-100 disabled:cursor-default text-end'
								id='price'
								name='customerName'
								value={'Php ' + roomRate}
							/>
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
