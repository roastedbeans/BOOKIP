import React from 'react';

const LoadingPage = () => {
	return (
		<div className='flex flex-col items-center justify-center w-full h-screen bg-white gap-10'>
			<div>
				<h1 className='font-normal xl:text-6xl lg:text-5xl md:text-5xl sm:text-4xl xs:text-2xl 2xs:text-2xl text-2xl text-primaryColor '>
					B<span className='font-bold '>OO</span>KIP
				</h1>
			</div>
			<div className='flex flex-row items-center justify-center w-full bg-white gap-10'>
				<div className='w-4 h-4 md:w-8 md:h-8 sm:w-6 sm:h-6  rounded-full bg-tertiaryColor animate-bounce duration-700'></div>
				<div className='w-5 h-5 md:w-9 md:h-9 sm:w-7 sm:h-7 rounded-full bg-secondaryColor animate-bounce duration-700'></div>
				<div className='w-6 h-6 md:w-10 md:h-10 sm:w-8 sm:h-8 rounded-full bg-primaryColor animate-bounce duration-700'></div>
			</div>
		</div>
	);
};
export default LoadingPage;
