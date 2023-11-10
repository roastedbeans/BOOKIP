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

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const password_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const SignUp = ({ onClickSignIn }) => {
	const { setAuth } = useContext(AuthContext);
	const userRef = useRef();
	const errRef = useRef();

	const [validName, setValidName] = useState(false);
	const [userFocus, setUserFocus] = useState(false);

	const [validPassword, setValidPassword] = useState(false);
	const [passwordFocus, setPasswordFocus] = useState(false);

	const [matchPassword, setMatchPassword] = useState('');
	const [validMatch, setValidMatch] = useState(false);
	const [matchFocus, setMatchFocus] = useState(false);

	const [user, setUser] = useState('');
	const [password, setPassword] = useState('');
	const [rememberMe, setRememberMe] = useState(false);
	const [errMsg, setErrMsg] = useState('');
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		//useRef.current.focus();
	}, []);

	useEffect(() => {
		setValidName(USER_REGEX.test(user));
	}, [user]);

	useEffect(() => {
		setValidPassword(password_REGEX.test(password));
		setValidMatch(password === matchPassword);
	}, [password, matchPassword]);

	useEffect(() => {
		setErrMsg('');
	}, [user, password, matchPassword]);

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
		const v1 = USER_REGEX.test(user);
		const v2 = password_REGEX.test(password);
		// Implement your sign-in logic here
		if (!v1 || !v2) {
			setErrMsg('Invalid Entry');
			return;
		}
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
		} catch (err) {
			if (!err?.response) {
				setErrMsg('No Server Response');
			} else if (err.response?.status === 409) {
				setErrMsg('Username Taken');
			} else {
				setErrMsg('Registration Failed');
			}
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
						<div className='flex flex-col w-full gap-2'>
							<Input
								type='text'
								id='user'
								placeholder='Username'
								className='w-full'
								ref={userRef}
								autoComplete='off'
								aria-invalid={validName ? 'false' : 'true'}
								aria-describedby='uidNote'
								value={user}
								onChange={(e) => setUser(e.target.value)}
								onFocus={() => setUserFocus(true)}
								onBlur={() => setUserFocus(false)}
								required
							/>
							<p id='uidNote' className={userFocus && user && !validName ? 'block text-xs text-gray-600' : 'hidden'}>
								<li>4 to 24 characters.</li>
								<li>Must begin with a letter.</li>
								<li>Letters, numbers, underscores, hyphens allowed.</li>
							</p>
						</div>
						<div className='flex flex-col w-full gap-2'>
							<Input
								type='password'
								id='password'
								placeholder='Password'
								className='w-full'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
								aria-invalid={validPassword ? 'false' : 'true'}
								aria-describedby='passwordNote'
								onFocus={() => setPasswordFocus(true)}
								onBlur={() => setPasswordFocus(false)}
							/>
							<p
								id='passwordNote'
								className={passwordFocus && !validPassword ? 'block text-xs text-gray-600' : 'hidden'}
							>
								<li>8 to 24 characters.</li>
								<li>Must include uppercase and lowercase letters, a number and a special character.</li>
								<li>
									Allowed special characters: <span aria-label='exclamation mark'>!</span>{' '}
									<span aria-label='at symbol'>@</span> <span aria-label='hashtag'>#</span>{' '}
									<span aria-label='dollar sign'>$</span> <span aria-label='percent'>%</span>
								</li>
							</p>
						</div>
						<div className='flex flex-col w-full gap-2'>
							<Input
								type='password'
								id='confirmPassword'
								placeholder='Confirm Password'
								className='w-full'
								value={matchPassword}
								onChange={(e) => setMatchPassword(e.target.value)}
								required
								aria-invalid={validMatch ? 'false' : 'true'}
								aria-describedby='confirmNote'
								onFocus={() => setMatchFocus(true)}
								onBlur={() => setMatchFocus(false)}
							/>
							<p id='confirmNote' className={matchFocus && !validMatch ? 'block text-xs text-gray-600' : 'hidden'}>
								<li>Must match the first password input field.</li>
							</p>
						</div>
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
							<p>Already registered?</p>
							<button onClick={onClickSignIn} type='button' className='underline underline-offset-2'>
								Sign In
							</button>
						</div>
					</section>
					<Button type='submit'>Enter</Button>
				</form>
			</CardContent>
		</Card>
	);
};

export default SignUp;
