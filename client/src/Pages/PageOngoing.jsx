import React from 'react';
import Navbar from '@/components/Navbar';
import ongoingLogo from '@/assets/ongoing-image.gif';

const PageOngoing = () => {
	return (
		<div className='w-full h-fit items-center justify-start flex-col flex'>
			<div className='flex flex-col justify-center items-center'>
				<img src={ongoingLogo}></img>
				<div className='flex flex-col justify-center items-center xs:-translate-y-28 -translate-y-10 text-center'>
					<h1 className='font-bold md:text-2xl text-base'>Page Under Construction</h1>
					<h2 className='md:text-base text-xs'>Income statement feature will be added soon...</h2>
				</div>
			</div>
		</div>
	);
};

export default PageOngoing;
