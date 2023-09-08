import { useEffect, useState } from 'react';
import { ClerkProvider, SignedIn, SignedOut, ClerkLoading, ClerkLoaded } from '@clerk/clerk-react';
import { BrowserRouter, Route, Routes, useNavigate, Outlet, Navigate } from 'react-router-dom';
import 'react-responsive-modal/styles.css';
import axios from 'axios';
import Dashboard from './Pages/Dashboard';
import HeroPage from './Pages/HeroPage';
import LoadingPage from './components/LoadingPage';
import HistoryPage from './Pages/HistoryPage';
import IncomePage from './Pages/IncomePage';

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
					path='/'
					element={
						<>
							<ClerkLoaded>
								<SignedIn>
									<Dashboard />
								</SignedIn>
								<SignedOut>
									<Navigate to='/' />
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
									<Navigate to='/' />
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
									<HistoryPage />
								</SignedIn>
								<SignedOut>
									<Navigate to='/' />
									<HeroPage />
								</SignedOut>
							</ClerkLoaded>
						</>
					}
				/>
				<Route
					path='/income'
					element={
						<>
							<ClerkLoaded>
								<SignedIn>
									<IncomePage />
								</SignedIn>
								<SignedOut>
									<Navigate to='/' />
									<HeroPage />
								</SignedOut>
							</ClerkLoaded>
						</>
					}
				/>
				<Route
					path='*'
					element={
						<>
							<Navigate to='/' />
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
