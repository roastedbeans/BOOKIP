import React from 'react';
import { Card, CardContent } from './ui/card';
import { IoAddCircleOutline } from 'react-icons/io5';
import { Modal } from 'react-responsive-modal';
import HasContent from '../Posts';
import RoomForm from './RoomForm';
import RegistrationForm from './RegistrationForm';

const AddRoomButton = () => {
	const [open, setOpen] = React.useState(false);
	const onCloseModal = () => setOpen(false);
	const onOpenModal = () => setOpen(true);

	return (
		<>
			<button onClick={onOpenModal}>
				<Card className='w-full h-[339px] 2xl:hover:scale-[102%] 2xl:hover:opacity-70 transition-all'>
					<CardContent className='w-full h-full flex justify-center p-0 m-0'>
						<IoAddCircleOutline className='self-center text-[72px]' />
					</CardContent>
				</Card>
			</button>
			<Modal
				open={open}
				onClose={onCloseModal}
				center
				styles={{
					modal: {
						borderRadius: '16px',
					},
				}}
			>
				{HasContent() ? <RoomForm /> : <RegistrationForm />}
			</Modal>
		</>
	);
};

export default AddRoomButton;
