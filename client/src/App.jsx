import { useEffect, useState } from 'react';
import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn, SignIn, SignUp } from '@clerk/clerk-react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Dashboard from './Pages/Dashboard';
import Rooms from './Pages/Rooms';

if (!import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY) {
	throw new Error('Missing Publishable Key');
}

const clerkPubKey = import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY;

function PublicPage() {
	return (
		<>
			<h1>Public page</h1>
			<a href='/protected'>Go to protected page</a>
		</>
	);
}

function ClerkProviderWithRoutes() {
	const navigate = useNavigate();

	return (
		<div className='flex justify-center items-center h-screen w-full'>
			<ClerkProvider publishableKey={clerkPubKey} navigate={(to) => navigate(to)}>
				<Routes>
					<Route path='/' element={<PublicPage />} />
					<Route path='/sign-in/*' element={<SignIn routing='path' path='/sign-in' />} />
					<Route path='/sign-up/*' element={<SignUp routing='path' path='/sign-up' />} />

					<Route
						path='/dashboard'
						element={
							<>
								<SignedIn>
									<Dashboard />
								</SignedIn>
								<SignedOut>
									<RedirectToSignIn />
								</SignedOut>
							</>
						}
					/>
					<Route
						path='/rooms'
						element={
							<>
								<SignedIn>
									<Rooms />
								</SignedIn>
								<SignedOut>
									<RedirectToSignIn />
								</SignedOut>
							</>
						}
					/>
				</Routes>
			</ClerkProvider>
		</div>
	);
}

function App() {
	const [roomTypes, setRoomTypes] = useState([]);

	useEffect(() => {
		axios.get('http://localhost:5000/posts/room-types').then((response) => {
			//console.log(response.data);
		});
	}, []);

	return (
		<BrowserRouter>
			<ClerkProviderWithRoutes />
		</BrowserRouter>
	);
}

export default App;
