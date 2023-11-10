import React, { useState, useEffect, useRef, useContext } from 'react';
import { Card, CardContent, CardDescription, CardTitle, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from './ui/checkbox';
import bcrypt from 'bcryptjs';
import AuthContext from '@/context/AuthProvider';
import { host, user } from '@/Posts';
import axios from 'axios';

const SignIn = ({ onClickRegister }) => {
	const { setAuth } = useContext(AuthContext);
	const userRef = useRef();
	const errRef = useRef();

	const [user, setUser] = useState('');
	const [password, setPassword] = useState('');
	const [rememberMe, setRememberMe] = useState(false);
	const [errMsg, setErrMsg] = useState('');
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		//useRef.current.focus();
	}, []);

	useEffect(() => {
		setErrMsg('');
	}, [user, password]);

	useEffect(() => {
		const savedUser = localStorage.getItem('rememberedUser');
		const savedPasswordHash = localStorage.getItem('rememberedPasswordHash');
		if (savedUser) {
			setUser(savedUser);
		}
		if (savedPasswordHash) {
			// The password is hashed and saved in local storage
			// You would typically compare this hash with the one stored on the server during login
		}
	}, []);

	const handleSignIn = async (e) => {
		e.preventDefault();
		// Implement your sign-in logic here
		if (rememberMe) {
			try {
				// Hash the password before saving it
				const hashedPassword = await bcrypt.hash(password, 10); // Adjust the saltRounds

				// Save the email and hashed password to local storage
				localStorage.setItem('rememberedEmail', user);
				localStorage.setItem('rememberedPasswordHash', hashedPassword);
			} catch (error) {
				console.error('Error while hashing the password:', error);
			}
		} else {
			localStorage.removeItem('rememberedEmail');
			localStorage.removeItem('rememberedPasswordHash');
		}
		try {
			const response = await axios.post(`${host}/users`, JSON.stringify({ user, password }), {
				headers: { 'Content-Type': 'application/json' },
				withCredentials: true,
			});
			console.log(JSON.stringify(response?.data));
			const accessToken = response?.data?.accessToken;
			const roles = response?.data?.roles;
			setAuth({ user, password, roles, accessToken });
			setUser('');
			setPassword('');
			setSuccess(true);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Card className='sm:w-96 w-64 m-0'>
			<CardHeader>
				<CardTitle>Sign In</CardTitle>
				<CardDescription>Enter your registered account</CardDescription>
				<p ref={errRef} aria-live='assertive' className={`${errRef ? 'flex text-red-600' : 'hidden'}`}>
					{errMsg}
				</p>
			</CardHeader>
			<CardContent className='flex flex-col h-full justify-between gap-6 m-0'>
				<form onSubmit={handleSignIn}>
					<section className='flex flex-col gap-6 items-start justify-end h-full max-w-96'>
						<Input
							type='text'
							placeholder='Username'
							className='w-full'
							ref={userRef}
							autoComplete='off'
							value={user}
							onChange={(e) => setUser(e.target.value)}
							required
						/>
						<Input
							type='password'
							placeholder='Password'
							className='w-full'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
						<div className='flex items-center space-x-2'>
							<Checkbox checked={rememberMe} onCheckedChange={() => setRememberMe(!rememberMe)} />
							<label
								htmlFor='rememberMe'
								className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
							>
								Remember Me
							</label>
						</div>
						<div className='flex gap-1'>
							<p>Need an account?</p>
							<button onClick={onClickRegister} type='button' className='underline underline-offset-2'>
								Register
							</button>
						</div>
					</section>
					<Button type='submit'>Enter</Button>
				</form>
			</CardContent>
		</Card>
	);
};

export default SignIn;
