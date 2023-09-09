/* eslint-disable no-irregular-whitespace */
import React, { useState, useRef } from 'react';
import { SignIn, SignUp } from '@clerk/clerk-react';
import BookipTrans2 from '@/assets/Bookip-transparent2.png';
import background from '@/assets/background.svg';

export default function LandingPage() {
	const [showSignUp, setShowSignUp] = useState(false);
	const [showSignIn, setShowSignIn] = useState(false);
	const containerRef = useRef(null);

	const scrollToBottom = () => {
		if (containerRef.current) {
			containerRef.current.scrollTop = containerRef.current.scrollHeight;
		}
	};

	return (
		<div className={`w-full h-full overflow-x-hidden m-0 p-0`}>
			<img src={background} alt='bookip-bg' className=' absolute object-cover object-center -z-10 h-full w-full' />
			{/* Code block starts */}
			<div
				ref={containerRef}
				className='w-full h-screen sm:p-16 xs:p-4 p-1 overflow-x-hidden scroll-smooth 2xl:overflow-y-hidden overflow-y-auto'
			>
				<div
					className={`relative rounded-lg container py-10 flex flex-col backdrop-blur-md bg-gradient-to-bl from-[rgba(34,34,34,0.4)] to-[rgba(10,10,10,0.6)] 2xl:h-full ${
						showSignIn || showSignUp ? 'h-fit' : 'h-full'
					}`}
				>
					<img
						className='mr-2 lg:mr-12 mt-2 lg:mt-12 absolute right-0 top-0'
						src='https://tuk-cdn.s3.amazonaws.com/can-uploader/center_aligned_with_image-svg2.svg'
						alt='bookip-corner-bg'
					/>
					<img
						className='ml-2 lg:ml-12 mb-2 lg:mb-12 absolute bottom-0 left-0'
						src='https://tuk-cdn.s3.amazonaws.com/can-uploader/center_aligned_with_image-svg3.svg'
						alt='bookip-corner-bg'
					/>

					<div className=' flex flex-col 2xl:flex-row w-full h-full 2xl:gap-0 gap-10 justify-center items-center 2xl:px-20'>
						<div className='flex flex-col gap-6 justify-center items-center w-full h-full'>
							<h1
								className={`w-full transition-all duration-500 2xl:text-6xl lg:text-5xl md:text-5xl sm:text-4xl xs:text-2xl 2xs:text-xl text-center text-white font-bold leading-tight ${
									showSignUp || showSignIn ? '2xl:translate-x-[0px]' : '2xl:translate-x-[50%]'
								}`}
							>
								Keep it organized
							</h1>
							<h1
								className={`w-full transition-all duration-500 2xl:text-6xl lg:text-5xl md:text-5xl sm:text-4xl xs:text-2xl 2xs:text-xl text-center text-white font-bold leading-tight ${
									showSignUp || showSignIn ? '2xl:-translate-x-[200px]' : '2xl:translate-x-[50%]'
								}`}
							>
								with
							</h1>
							<div
								className={`transition-all duration-500 flex w-full h-fit items-center gap-4 justify-center ${
									showSignUp || showSignIn ? '2xl:-translate-x-[100px]' : '2xl:translate-x-[50%]'
								}`}
							>
								<img src={BookipTrans2} alt='bookip-logo' className='2xl:h-24 xl:h-20 md:h-16 sm:h-12 h-10 w-fit' />
								<h1 className='font-normal xl:text-6xl lg:text-5xl md:text-5xl sm:text-4xl xs:text-2xl 2xs:text-2xl text-2xl text-white '>
									B<span className='font-bold '>OO</span>KIP
								</h1>
							</div>

							<div
								className={`transition-all duration-500 flex w-full justify-center ${
									showSignUp || showSignIn ? '2xl:-translate-x-[60px]' : '2xl:translate-x-[50%]'
								}`}
							>
								<button
									onClick={() => setShowSignUp(true) || setShowSignIn(false) || scrollToBottom()}
									className='hover:text-darkColor focus:text-darkColor lg:text-xl hover:bg-white focus:bg-white hover:scale-105 focus:scale-105 bg-primaryColor transition duration-150 ease-in-out rounded text-white px-4 sm:px-8 py-1 sm:py-3 text-sm'
								>
									Get Started
								</button>
								<button
									onClick={() => setShowSignIn(true) || setShowSignUp(false) || scrollToBottom()}
									className=' lg:text-xl 2xl:hover:border-secondaryColor focus:border-secondaryColor 2xl:hover:scale-105 focus:scale-105 ml-3 sm:ml-6 bg-transparent transition duration-150 ease-in-out focus:outline-none rounded border border-white text-white px-4 sm:px-8 py-1 sm:py-3 text-sm'
								>
									Got Account?
								</button>
							</div>
						</div>
						{/* Clerk Card */}
						<div
							className={` flex transition duration-500 2xl:justify-start self-center justify-center xl:items-center w-3/4 items-start ${
								showSignUp || showSignIn
									? '2xl:-translate-x-[0] 2xl:scale-100 scale-y-100 h-fit relative'
									: '2xl:translate-x-[1000px] 2xl:scale-100 scale-y-0 h-[0] relative'
							}`}
						>
							<div
								className={`2xl:translate-x-8 translate-x-[50%] transition duration-500 2xl:absolute relative ease-in-out ${
									showSignUp || !showSignIn ? 'xs:scale-100 scale-[98%] opacity-100 absolute' : 'scale-0 opacity-0 '
								}`}
							>
								<SignUp path='/' routing='path' />
							</div>
							<div
								className={`2xl:translate-x-8 -translate-x-[50%] transition duration-500 2xl:absolute relative ease-in-out ${
									!showSignUp || showSignIn ? 'xs:scale-100 scale-[98%] opacity-100 absolute' : 'scale-0 opacity-0 '
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
