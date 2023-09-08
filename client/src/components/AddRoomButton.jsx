import React from 'react';
import { Card, CardContent } from './ui/card';
import { IoAddCircleOutline } from 'react-icons/io5';
import { Modal } from 'react-responsive-modal';
import RoomForm from './RoomForm';
import { modalCustomStyles } from '@/themes';

const AddRoomButton = () => {
	const [open, setOpen] = React.useState(false);
	const onCloseModal = () => setOpen(false);
	const onOpenModal = () => setOpen(true);

	return (
		<>
			<button onClick={onOpenModal} className='sm:w-60 w-full h-fit'>
				<Card className='w-full h-[346px] 2xl:hover:scale-[102%] 2xl:hover:shadow-xl 2xl:hover:opacity-80 2xl:hover:-translate-y-4 transition-all bg-gradient-to-bl from-white to-gray-50'>
					<CardContent className='w-full h-full flex justify-center p-0 m-0'>
						<IoAddCircleOutline className='self-center text-[72px]' />
					</CardContent>
				</Card>
			</button>
			<Modal open={open} onClose={onCloseModal} center styles={modalCustomStyles}>
				<RoomForm />
			</Modal>
		</>
	);
};

export default AddRoomButton;
