import React from 'react';
import GuidesImage from '../assets/guides-image.svg';

const Footer = () => {
	return (
		<div className='relative flex w-full md:px-12 px-4 py-4 justify-between items-center text-sm border-opacity-60 mt-0 bg-transparent'>
			<a href='/guides'>
				<img
					src={GuidesImage}
					alt='registration-image'
					className='w-20 drop-shadow-md transition-transform duration-500 md:absolute left-4 bottom-4'
				/>
			</a>
			<p className='bg-black text-white text-xs absolute left-12 bottom-[74px] px-1 py-1 rounded animate-pulse'>
				Are you lost? Click here!
			</p>
			<div className='w-full flex justify-end'>
				©&nbsp;2023&nbsp;|&nbsp;
				<p className='text-primaryColor'>
					B<span className='font-bold'>OO</span>KIP
				</p>
			</div>
		</div>
	);
};

export default Footer;
