import React from 'react';
import { BrowserRouter, Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import 'react-responsive-modal/styles.css';
import Dashboard from './Pages/Dashboard';
import LoadingPage from './components/LoadingPage';
import HistoryPage from './Pages/HistoryPage';
import IncomePage from './Pages/IncomePage';
import LandingPage from './Pages/LandingPage';
import GuidesPage from './Pages/GuidesPage';

function App() {
	const [signedIn, setSignedIn] = React.useState(true);

	return (
		<BrowserRouter>
			{/* <LoadingPage /> */}

			<Routes>
				<Route
					path='/*'
					element={
						<>
							{signedIn ? (
								<Dashboard />
							) : (
								<>
									<Navigate to='/' />
									<LandingPage />
								</>
							)}
						</>
					}
				/>

				<Route
					path='/dashboard'
					element={
						<>
							{signedIn ? (
								<Dashboard />
							) : (
								<>
									<Navigate to='/' />
									<LandingPage />
								</>
							)}
						</>
					}
				/>
				<Route
					path='/history'
					element={
						<>
							{signedIn ? (
								<HistoryPage />
							) : (
								<>
									<Navigate to='/' />
									<LandingPage />
								</>
							)}
						</>
					}
				/>
				<Route
					path='/income'
					element={
						<>
							{signedIn ? (
								<IncomePage />
							) : (
								<>
									<Navigate to='/' />
									<LandingPage />
								</>
							)}
						</>
					}
				/>
				<Route
					path='/guides'
					element={
						<>
							{signedIn ? (
								<GuidesPage />
							) : (
								<>
									<Navigate to='/' />
									<LandingPage />
								</>
							)}
						</>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
