import React from 'react';
import { ClerkProvider, SignedIn, SignedOut, ClerkLoading, ClerkLoaded } from '@clerk/clerk-react';
import { BrowserRouter, Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import 'react-responsive-modal/styles.css';
import Dashboard from './Pages/Dashboard';
import LoadingPage from './components/LoadingPage';
import HistoryPage from './Pages/HistoryPage';
import IncomePage from './Pages/IncomePage';
import LandingPage from './Pages/LandingPage';

if (!import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY) {
	throw new Error('Missing Publishable Key');
}

const clerkPubKey = import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY;

function ClerkProviderWithRoutes() {
	const navigate = useNavigate();

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
									<Navigate to='/' />
									<LandingPage />
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
									<LandingPage />
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
									<LandingPage />
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
									<LandingPage />
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
