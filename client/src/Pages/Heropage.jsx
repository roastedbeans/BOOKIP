import React, { useState, useRef } from 'react';
import { SignIn, SignUp } from '@clerk/clerk-react';
import BookipLogo1 from '../assets/Bookip-logo1.png';
import BookipTrans1 from '../assets/Bookip-transparent1.png';
import BookipTrans2 from '../assets/Bookip-transparent2.png';
import background from '../assets/background.svg';

function HeroPage() {
	const [showSignUp, setShowSignUp] = useState(false);
	const [showSignIn, setShowSignIn] = useState(false);
	const containerRef = useRef(null);

	const scrollToBottom = () => {
		if (containerRef.current) {
			containerRef.current.scrollTop = containerRef.current.scrollHeight;
		}
	};

	return (
		<div className={`w-full h-screen overflow-hidden m-0 p-0`}>
			<img src={background} className=' absolute object-cover object-center -z-10 h-screen w-full' />{' '}
			{/* Code block starts */}
			<div
				ref={containerRef}
				className='w-full h-screen sm:p-16 xs:p-4 p-0 overflow-x-hidden scroll-smooth 2xl:overflow-y-hidden overflow-y-auto'
			>
				<div
					className={`relative rounded-lg container flex flex-col glass-container ${
						showSignIn || showSignUp ? 'h-fit' : 'h-full'
					}`}
				>
					<img
						className='mr-2 lg:mr-12 mt-2 lg:mt-12 absolute right-0 top-0'
						src='https://tuk-cdn.s3.amazonaws.com/can-uploader/center_aligned_with_image-svg2.svg'
						alt='bg'
					/>
					<img
						className='ml-2 lg:ml-12 mb-2 lg:mb-12 absolute bottom-0 left-0'
						src='https://tuk-cdn.s3.amazonaws.com/can-uploader/center_aligned_with_image-svg3.svg'
						alt='bg'
					/>

					<div className=' flex flex-col 2xl:flex-row w-full h-full 2xl:gap-0 3xl:gap-12 xl:gap-0 gap-10 justify-center 2xl:mt-0 mt-44'>
						<div className='flex self-center flex-col gap-6 justify-start items-center'>
							<h1
								className={`transition-all duration-500 xl:text-6xl lg:text-5xl md:text-5xl sm:text-4xl xs:text-2xl 2xs:text-xl text-center text-white font-bold leading-tight ${
									showSignUp || showSignIn ? '2xl:-translate-x-[240px] 2xl:-translate-y-[0]' : ''
								}`}
							>
								Keep it organized with
							</h1>
							<div
								className={`transition-all duration-500 flex w-full h-fit items-center gap-4 justify-center ${
									showSignUp || showSignIn ? '2xl:-translate-x-[380px] 2xl:-translate-y-[0] ' : ''
								}`}
							>
								<img src={BookipTrans2} className='2xl:h-24 xl:h-20 md:h-16 sm:h-12 h-10 w-fit' />
								<h1 className='font-normal xl:text-6xl lg:text-5xl md:text-5xl sm:text-4xl xs:text-3xl 2xs:text-3xl text-2xl text-white '>
									B<span className='font-bold '>OO</span>KIP
								</h1>
							</div>

							<div
								className={`transition-all duration-500 flex w-full justify-center ${
									showSignUp || showSignIn ? '2xl:-translate-x-[380px]  2xl:-translate-y-[0]' : ''
								}`}
							>
								<button
									onClick={() => setShowSignUp(true) || setShowSignIn(false) || scrollToBottom()}
									className='hover:text-darkColor lg:text-xl hover:bg-white hover:scale-105 bg-primaryColor transition duration-150 ease-in-out rounded text-white px-4 sm:px-8 py-1 sm:py-3 text-sm'
								>
									Get Started
								</button>
								<button
									onClick={() => setShowSignIn(true) || setShowSignUp(false) || scrollToBottom()}
									className='hover:text-primaryColor lg:text-xl hover:border-primaryColor hover:scale-105 ml-3 sm:ml-6 bg-transparent transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 ring-offset-primaryColor focus:ring-white hover:bg-primaryColor-800 rounded border border-white text-white px-4 sm:px-8 py-1 sm:py-3 text-sm'
								>
									Got Account?
								</button>
							</div>
						</div>
						<div
							className={`transition duration-500 flex 2xl:justify-start self-center justify-center xl:items-center 2xl:w-full w-full items-start ${
								showSignUp || showSignIn
									? '2xl:-translate-x-[0] 2xl:translate-y-[0] 2xl:scale-100 scale-y-100 h-fit m-0'
									: '2xl:translate-x-[1000px] 2xl:translate-y-[0] 2xl:scale-100 scale-y-0 h-[0] mt-32'
							}`}
						>
							<div
								className={`translate-x-[50%] transition duration-500 2xl:absolute relative pb-12 ease-in-out ${
									showSignUp || !showSignIn
										? '2xl:-translate-x-[170px] 2xl:translate-y-[0] 2xl:scale-100 scale-y-100 opacity-100'
										: '2xl:translate-x-[1080px] 2xl:translate-y-[0] 2xl:scale-100 scale-y-0 opacity-0'
								}`}
							>
								<SignUp path='/' routing='path' />
							</div>
							<div
								className={`-translate-x-[50%] transition duration-500 2xl:absolute relative pb-0 ease-in-out ${
									!showSignUp || showSignIn
										? '2xl:-translate-x-[170px] 2xl:translate-y-[0] 2xl:scale-100 scale-y-100 opacity-100'
										: '2xl:translate-x-[1080px] 2xl:translate-y-[0] 2xl:scale-100 scale-y-0 opacity-0'
								}`}
							>
								<SignIn path='/' routing='path' />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default HeroPage;
