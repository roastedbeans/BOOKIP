import React, { useState, useEffect } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import logo from '../assets/Bookip-transparent4.png';
import Clock from 'react-live-clock';
import { Calendar } from '../components/ui/calendar';
import { Button } from '../components/ui/button';

const navigation = [
	{ name: 'Dashboard', href: '/dashboard', current: false },
	{ name: 'History', href: '/history', current: false },
	{ name: 'Income Statement', href: '/income', current: false },
];

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
	const [navbar, setNavbar] = useState(false);
	const [showCalendar, setShowCalendar] = useState(false);

	const handleShowCalendar = () => {
		setShowCalendar(!showCalendar);
	};

	//Change color of navbar when scrolling
	const changeBackground = () => {
		if (window.scrollY >= 90) {
			setNavbar(true);
		} else {
			setNavbar(false);
		}
	};
	window.addEventListener('scroll', changeBackground);

	return (
		<div className='mb-16'>
			<Disclosure
				as='nav'
				className={`backdrop-blur-md drop-shadow-2xl top-0 z-10 transition-colors fixed w-full ${
					navbar ? ' bg-[rgba(0,0,0,0.6)]' : 'bg-[rgba(0,0,0,1)]'
				}`}
			>
				{({ open }) => (
					<>
						<div className='mx-auto w-full px-2 sm:px-8 lg:px-20'>
							<div className='relative flex h-16 items-center justify-between'>
								<div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
									{/* Mobile menu button*/}
									<Disclosure.Button className='relative inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-tertiaryColor hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
										<span className='absolute -inset-0.5' />
										<span className='sr-only'>Open main menu</span>
										{open ? (
											<XMarkIcon className='block h-6 w-6' aria-hidden='true' />
										) : (
											<Bars3Icon className='block h-6 w-6' aria-hidden='true' />
										)}
									</Disclosure.Button>
								</div>
								<div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start '>
									<div className='flex flex-shrink-0 items-center'>
										<img className='h-10 w-auto' src={logo} alt='Your Company' />
									</div>
									<div className='hidden sm:ml-6 sm:block'>
										<div className='flex space-x-4 '>
											{navigation.map((item) => (
												<a
													key={item.name}
													href={item.href}
													className={classNames(
														item.current ? 'text-white' : 'text-white hover:bg-tertiaryColor hover:text-black',
														'rounded-md px-3 py-2 text-sm font-medium transition-colors duration-75'
													)}
													aria-current={item.current ? 'page' : undefined}
												>
													{item.name}
												</a>
											))}
										</div>
									</div>
								</div>
								<div className='flex-col h-fit w-32 sm:flex hidden'>
									<Button
										onClick={() => handleShowCalendar()}
										className='text-black font-semibold flex py-1 bg-white rounded-md hover:bg-tertiaryColor'
									>
										<Clock format={'hh:mm:ss A'} ticking={true} timezone={'Asia/Manila'} />
									</Button>
									{showCalendar ? <Calendar className='mt-10 absolute bg-white rounded-md' /> : ''}
									{showCalendar ? (
										<div onClick={() => handleShowCalendar()} className=' w-full h-screen fixed left-0 top-0 z-10' />
									) : (
										''
									)}
								</div>
								<div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 w-8'></div>
							</div>
						</div>

						<Disclosure.Panel className='sm:hidden'>
							<div className='space-y-1 px-2 pb-6 pt-2'>
								{navigation.map((item) => (
									<Disclosure.Button
										key={item.name}
										as='a'
										href={item.href}
										className={classNames(
											item.current
												? 'bg-gray-900 text-white'
												: 'text-gray-300 hover:hover:bg-tertiaryColor hover:text-white',
											'block rounded-md px-3 py-2 text-base font-medium'
										)}
										aria-current={item.current ? 'page' : undefined}
									>
										{item.name}
									</Disclosure.Button>
								))}
							</div>
						</Disclosure.Panel>
					</>
				)}
			</Disclosure>
		</div>
	);
}
