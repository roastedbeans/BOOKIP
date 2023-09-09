import React, { useState } from 'react';
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetFooter,
	SheetTrigger,
} from '@/components/ui/sheet';
import Select from 'react-select';
import {
	createForm,
	FormSchema,
	bedNumberOptions,
	crInclusionOptions,
	tvInclusionOptions,
	roomTypeOptions,
} from '@/formValue';
import { themes, customStyles } from '@/themes';
import { BiEdit } from 'react-icons/bi';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { HotelInfo } from '@/Posts';
import axios from 'axios';

export default function RoomFormUpdate(room) {
	const [roomInfo, setRoomInfo] = useState(room.room);

	const registrationID = HotelInfo().id;
	const onHandleChange = (e) => {
		setRoomInfo({ ...roomInfo, [e.target.id]: e.target.value, registrationID: registrationID });
	};
	const onHandleRoomType = (e) => {
		setRoomInfo({ ...roomInfo, roomType: e.value });
	};
	const onHandleBedNumber = (e) => {
		setRoomInfo({ ...roomInfo, bedNumber: e.value });
	};
	const onHandleCrInclusion = (e) => {
		setRoomInfo({ ...roomInfo, crInclusion: e.value });
	};
	const onHandleTvInclusion = (e) => {
		setRoomInfo({ ...roomInfo, tvInclusion: e.value });
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		try {
			await axios.put(`http://localhost:5000/posts/room/id/${room.room.id}`, roomInfo).then((response) => {
				console.log(response.data);
			});
		} catch (err) {
			console.log(err);
		}
		setRoomInfo(createForm);
		window.location.reload();
	};

	const handleDeleteRoom = async (e) => {
		e.preventDefault();
		try {
			await axios.delete(`http://localhost:5000/posts/room/id/${room.room.id}`, roomInfo).then((response) => {
				console.log(response.data);
			});
		} catch (err) {
			console.log(err);
		}
		setRoomInfo(createForm);
		window.location.reload();
	};

	return (
		<Sheet className='w-fit shadow-none border-none'>
			<SheetTrigger>
				<BiEdit />
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Update Room</SheetTitle>
					<SheetDescription>Update selected room</SheetDescription>
				</SheetHeader>
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
								isSearchable={false}
								styles={customStyles}
								theme={themes}
								id='roomType'
								options={roomTypeOptions}
								onChange={onHandleRoomType}
								value={roomTypeOptions.filter((room) => room.value === roomInfo.roomType)[0]}
								placeholder='Select room type'
								required
							></Select>
						</div>
						<div className='flex flex-col space-y-1.5 text-sm'>
							<Label htmlFor='bedNumber'>Bed Number</Label>
							<Select
								isSearchable={false}
								styles={customStyles}
								theme={themes}
								id='bedNumber'
								options={bedNumberOptions}
								onChange={onHandleBedNumber}
								value={bedNumberOptions.filter((bed) => bed.value === roomInfo.bedNumber)[0]}
								placeholder='Select bed number'
								required
							></Select>
						</div>
						<div className='flex flex-col space-y-1.5 text-sm shadow-sm'>
							<Label htmlFor='crInclusion'>CR Inclusion</Label>
							<Select
								isSearchable={false}
								styles={customStyles}
								theme={themes}
								id='crInclusion'
								options={crInclusionOptions}
								onChange={onHandleCrInclusion}
								value={crInclusionOptions.filter((cr) => cr.value === roomInfo.crInclusion)[0]}
								placeholder='Select CR inclusion'
								required
							></Select>
						</div>
						<div className='flex flex-col space-y-1.5 text-sm'>
							<Label htmlFor='tvInclusion'>TV Inclusion</Label>
							<Select
								isSearchable={false}
								styles={customStyles}
								theme={themes}
								id='tvInclusion'
								options={tvInclusionOptions}
								onChange={onHandleTvInclusion}
								value={tvInclusionOptions.filter((tv) => tv.value === roomInfo.tvInclusion)[0]}
								placeholder='Select TV inclusion'
								required
							></Select>
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
					<SheetFooter className='flex justify-between m-0 p-0 mt-4'>
						<Button type='button' onClick={handleDeleteRoom} variant='outline'>
							Remove
						</Button>
						<Button type='submit' className='bg-darkColor'>
							Update
						</Button>
					</SheetFooter>
				</form>
			</SheetContent>
		</Sheet>
	);
}
