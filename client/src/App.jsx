import { useEffect, useState } from 'react';
import { ClerkProvider, SignedIn, SignedOut, ClerkLoading, ClerkLoaded } from '@clerk/clerk-react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import 'react-responsive-modal/styles.css';
import axios from 'axios';
import Dashboard from './Pages/Dashboard';
import HeroPage from './Pages/HeroPage';
import Rooms from './Pages/Rooms';
import LoadingPage from './components/LoadingPage';

if (!import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY) {
	throw new Error('Missing Publishable Key');
}

const clerkPubKey = import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY;

function ClerkProviderWithRoutes() {
	const navigate = useNavigate();

	const toHeroPage = () => {
		navigate('/');
	};

	return (
		<ClerkProvider publishableKey={clerkPubKey} navigate={(to) => navigate(to)}>
			<ClerkLoading>
				<LoadingPage />
			</ClerkLoading>
			<Routes>
				<Route
					path='/*'
					element={
						<>
							<ClerkLoaded>
								<SignedIn>
									<Dashboard />
								</SignedIn>
								<SignedOut>
									{toHeroPage}
									<HeroPage />
								</SignedOut>
							</ClerkLoaded>
						</>
					}
				/>

				<Route
					path='/dashboard'
					element={
						<>
							<ClerkLoaded>
								<SignedIn>
									<Dashboard />
								</SignedIn>
								<SignedOut>
									{toHeroPage}
									<HeroPage />
								</SignedOut>
							</ClerkLoaded>
						</>
					}
				/>
				<Route
					path='/history'
					element={
						<>
							<ClerkLoaded>
								<SignedIn>
									<Rooms />
								</SignedIn>
								<SignedOut>
									{toHeroPage}
									<HeroPage />
								</SignedOut>
							</ClerkLoaded>
						</>
					}
				/>
			</Routes>
		</ClerkProvider>
	);
}

function App() {
	return (
		<BrowserRouter>
			<ClerkProviderWithRoutes />
		</BrowserRouter>
	);
}

export default App;
