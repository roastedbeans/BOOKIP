'use client';

import * as React from 'react';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import Select from 'react-select';
import {
	createForm,
	FormSchema,
	bedNumberOptions,
	crInclusionOptions,
	tvInclusionOptions,
	roomTypeOptions,
} from '../formValue';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { themes, customStyles } from '../themes';
import axios from 'axios';
import { HotelInfo } from '../Posts';
import 'react-responsive-modal/styles.css';

export default function RoomForm() {
	const [selectedRoomType, setSelectedRoomType] = useState('');
	const [selectedBedNumber, setSelectedBedNumber] = useState('');
	const [selectedCrInclusion, setSelectedCrInclusion] = useState('');
	const [selectedTvInclusion, setSelectedTvInclusion] = useState('');

	const [roomInfo, setRoomInfo] = useState(createForm);

	const registrationID = HotelInfo().id;
	const onHandleChange = (e) => {
		setRoomInfo({ ...roomInfo, [e.target.id]: e.target.value, registrationID: registrationID });
	};

	const onHandleRoomType = (e) => {
		setRoomInfo({ ...roomInfo, roomType: e.value });
		setSelectedRoomType(e);
	};
	const onHandleBedNumber = (e) => {
		setRoomInfo({ ...roomInfo, bedNumber: e.value });
		setSelectedBedNumber(e);
	};
	const onHandleCrInclusion = (e) => {
		setRoomInfo({ ...roomInfo, crInclusion: e.value });
		setSelectedCrInclusion(e);
	};
	const onHandleTvInclusion = (e) => {
		setRoomInfo({ ...roomInfo, tvInclusion: e.value });
		setSelectedTvInclusion(e);
	};

	console.log(registrationID);
	const onSubmit = (e) => {
		e.preventDefault();
		try {
			axios.post('http://localhost:5000/posts/room-types', roomInfo).then((response) => {
				console.log(response.data);
			});
		} catch (err) {
			console.log(err);
		}
		setRoomInfo(createForm);
		setSelectedRoomType('');
		setSelectedBedNumber('');
		setSelectedCrInclusion('');
		setSelectedTvInclusion('');
		window.location.reload();
	};

	return (
		<Card className='w-fit shadow-none border-none'>
			<CardHeader>
				<CardTitle>Create Room</CardTitle>
				<CardDescription>Create your room now</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={onSubmit}>
					<div className='grid w-full items-center gap-4'>
						<div className='flex flex-col space-y-1.5'>
							<Label htmlFor='name'>Name</Label>
							<Input
								id='name'
								name='name'
								type='text'
								placeholder='Enter room name'
								value={roomInfo.name}
								required
								onChange={onHandleChange}
							/>
						</div>
						<div className='flex flex-col space-y-1.5 text-sm'>
							<Label htmlFor='roomType'>Room Type</Label>
							<Select
								styles={customStyles}
								theme={themes}
								id='roomType'
								options={roomTypeOptions}
								onChange={onHandleRoomType}
								defaultValue={roomTypeOptions[0]}
								value={selectedRoomType}
								placeholder='Select room type'
								required></Select>
						</div>
						<div className='flex flex-col space-y-1.5 text-sm'>
							<Label htmlFor='bedNumber'>Bed Number</Label>
							<Select
								styles={customStyles}
								theme={themes}
								id='bedNumber'
								options={bedNumberOptions}
								onChange={onHandleBedNumber}
								defaultValue={bedNumberOptions[0]}
								value={selectedBedNumber}
								placeholder='Select bed number'
								required></Select>
						</div>
						<div className='flex flex-col space-y-1.5 text-sm shadow-sm'>
							<Label htmlFor='crInclusion'>CR Inclusion</Label>
							<Select
								styles={customStyles}
								theme={themes}
								id='crInclusion'
								options={crInclusionOptions}
								onChange={onHandleCrInclusion}
								defaultValue={crInclusionOptions[0]}
								value={selectedCrInclusion}
								placeholder='Select CR inclusion'
								required></Select>
						</div>
						<div className='flex flex-col space-y-1.5 text-sm'>
							<Label htmlFor='tvInclusion'>TV Inclusion</Label>
							<Select
								styles={customStyles}
								theme={themes}
								id='tvInclusion'
								options={tvInclusionOptions}
								onChange={onHandleTvInclusion}
								defaultValue={tvInclusionOptions[0]}
								value={selectedTvInclusion}
								placeholder='Select TV inclusion'
								required></Select>
						</div>
						<div className='flex gap-4 sm:flex-row flex-col'>
							<div className='flex flex-col space-y-1.5'>
								<Label htmlFor='12hrPrice'>12-Hour Price</Label>
								<Input
									id='price12h'
									name='price12h'
									onChange={onHandleChange}
									value={roomInfo.price12h}
									type='number'
									placeholder='Enter price'
									required
								/>
							</div>
							<div className='flex flex-col space-y-1.5'>
								<Label htmlFor='24hrPrice'>24-Hour Price</Label>
								<Input
									id='price24h'
									name='price24h'
									onChange={onHandleChange}
									value={roomInfo.price24h}
									type='number'
									placeholder='Enter price'
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
						<Button
							type='submit'
							className='bg-darkColor'>
							Create
						</Button>
					</CardFooter>
				</form>
			</CardContent>
		</Card>
	);
}
