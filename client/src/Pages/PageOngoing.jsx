import React from 'react';
import Navbar from '@/components/Navbar';
import ongoingLogo from '@/assets/ongoing-image.gif';

const PageOngoing = () => {
	return (
		<div className='w-full h-fit items-center justify-start flex-col flex'>
			<Navbar />
			<div className='flex flex-col justify-center items-center -translate-y-20'>
				<img src={ongoingLogo}></img>
				<div className='flex flex-col justify-center items-center -translate-y-28'>
					<h1 className='font-bold text-2xl'>Page Under Construction</h1>
					<h2>Income statement feature will be added soon...</h2>
				</div>
			</div>
		</div>
	);
};

export default PageOngoing;
