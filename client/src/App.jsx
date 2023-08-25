import { useEffect, useState } from 'react';
import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn, SignIn, SignUp } from '@clerk/clerk-react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Dashboard from './Pages/Dashboard';
import HeroPage from './Pages/HeroPage';
import Rooms from './Pages/Rooms';

if (!import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY) {
	throw new Error('Missing Publishable Key');
}

const clerkPubKey = import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY;

function ClerkProviderWithRoutes() {
	const navigate = useNavigate();

	return (
		<ClerkProvider
			publishableKey={clerkPubKey}
			navigate={(to) => navigate(to)}>
			<Routes>
				<Route
					path='/'
					element={<HeroPage />}
				/>
				<Route
					path='/'
					element={
						<SignIn
							routing='path'
							path='/'
						/>
					}
				/>
				<Route
					path='/'
					element={
						<SignUp
							routing='path'
							path='/'
						/>
					}
				/>

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
	);
}

function App() {
	const [roomTypes, setRoomTypes] = useState([]);

	useEffect(() => {
		axios.get('http://localhost:5000/posts/registration').then((response) => {
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
