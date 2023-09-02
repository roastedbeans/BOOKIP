import React from 'react';

const LoadingPage = () => {
	return (
		<div className='flex items-center justify-center w-full h-screen bg-white gap-10'>
			<div className='w-8 h-8 rounded-full bg-tertiaryColor animate-bounce duration-700'></div>
			<div className='w-10 h-10 rounded-full bg-secondaryColor animate-bounce duration-700'></div>
			<div className='w-12 h-12 rounded-full bg-primaryColor animate-bounce duration-700'></div>
		</div>
	);
};
export default LoadingPage;
