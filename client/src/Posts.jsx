import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '@clerk/clerk-react';
import LoadingPage from './components/LoadingPage';

export const host = 'http://localhost:5000';

export default function Posts() {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		axios
			.get(`${host}`)
			.then((response) => {
				setPosts(response.data);
				setLoading(false);
			})
			.catch((err) => {
				console.error(err);
				setError(err);
				setLoading(false);
			});
	}, []);

	if (loading) {
		return <LoadingPage />;
	}

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	// Render your posts using the 'posts' state data
	return (
		<div>
			{posts.map((post) => (
				<div key={post.id}>{post.title}</div>
			))}
		</div>
	);
}

export function HotelInfo() {
	const { user } = useUser();
	const [hotelInfo, setHotelInfo] = useState([]);

	useEffect(() => {
		async function fetchData() {
			try {
				const response = await axios.get(`${host}/registrations/user/${user.id}`);
				setHotelInfo(response.data);
			} catch (error) {
				console.error('Error fetching HotelInfo: ', error);
			}
		}
		fetchData();
	}, [user.id]);

	return hotelInfo;
}

export function RoomInfo(registrationID) {
	const [roomInfo, setRoomInfo] = useState([]);

	useEffect(() => {
		async function fetchData() {
			try {
				await axios.get(`${host}/rooms/registration/${registrationID}`).then((response) => {
					//sort by room name
					const sortedData = response.data.sort((a, b) => (a.name > b.name ? 1 : -1));
					setRoomInfo(sortedData);
				});
			} catch (error) {
				console.log('Error fetching RoomInfo: ', error);
			}
		}
		fetchData();
	}, [registrationID]);

	return roomInfo;
}

export function BookingInfoByRegistrationID(registrationID) {
	const [bookingInfo, setBookingInfo] = useState([]);

	useEffect(() => {
		async function fetchData() {
			try {
				await axios.get(`${host}/bookings/registration/${registrationID}`).then((response) => {
					setBookingInfo(response.data);
				});
			} catch (error) {
				console.error('Error fetching BookingInfo: ', error);
			}
		}
		fetchData();
	}, [registrationID]);

	return bookingInfo;
}

export function BookingInfo() {
	const [bookingInfo, setBookingInfo] = useState([]);

	useEffect(() => {
		async function fetchData() {
			try {
				await axios.get(`${host}/bookings`).then((response) => {
					setBookingInfo(response.data);
				});
			} catch (error) {
				console.error('Error fetching BookingInfo: ', error);
			}
		}
		fetchData();
	}, []);

	return bookingInfo;
}

export function BookingInfoByID(roomID) {
	const [bookingInfo, setBookingInfo] = useState([]);

	useEffect(() => {
		async function fetchData() {
			try {
				await axios.get(`${host}/bookings/room/${roomID}`).then((response) => {
					//filter by the status of the booking
					const filteredData = response.data.filter((booking) => booking.status === true)[0];
					setBookingInfo(filteredData);
				});
			} catch (error) {
				console.log('Error fetching BookingInfoByID: ', error);
			}
		}
		fetchData();
	}, [roomID]);

	return bookingInfo;
}
