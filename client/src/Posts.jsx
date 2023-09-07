import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '@clerk/clerk-react';
import LoadingPage from './components/LoadingPage';

export default function Posts() {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		axios
			.get('http://localhost:5000/posts')
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
		axios.get(`http://localhost:5000/posts/registrations/user/${user.id}`).then((response) => {
			setHotelInfo(response.data);
		});
	}, [user.id]);

	return hotelInfo;
}

export function RoomInfo(registrationID) {
	const [roomInfo, setRoomInfo] = useState([]);
	useEffect(() => {
		axios.get(`http://localhost:5000/posts/room/registration/${registrationID}`).then((response) => {
			//sort by room name
			const sortedData = response.data.sort((a, b) => (a.name > b.name ? 1 : -1));
			setRoomInfo(sortedData);
		});
	}, [registrationID]);

	return roomInfo;
}

export function BookingInfo() {
	const [bookingInfo, setBookingInfo] = useState([]);
	useEffect(() => {
		axios.get(`http://localhost:5000/posts/bookings/`).then((response) => {
			setBookingInfo(response.data);
		});
	}, []);

	return bookingInfo;
}

export function BookingInfoByID(roomID) {
	const [bookingInfo, setBookingInfo] = useState([]);
	useEffect(() => {
		axios.get(`http://localhost:5000/posts/bookings/room/${roomID}`).then((response) => {
			//filter by the status of the booking
			const filteredData = response.data.filter((booking) => booking.status === true)[0];
			setBookingInfo(filteredData);
		});
	}, [roomID]);

	return bookingInfo;
}
