import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '@clerk/clerk-react';

export default function HasContent() {
	const [hasContent, setHasContent] = useState(false);

	useEffect(() => {
		axios.get('http://localhost:5000/posts/registration').then((response) => {
			console.log(response.data);
			setHasContent(response.data.length > 0);
		});
	}, []);

	return hasContent;
}

export function HotelInfo() {
	const { user } = useUser();
	const [hotelInfo, setHotelInfo] = useState([]);
	useEffect(() => {
		axios.get(`http://localhost:5000/posts/registration/${user.id}`).then((response) => {
			setHotelInfo(response.data);
		});
	}, [user.id]);

	return hotelInfo;
}

export function RoomInfo(registrationID) {
	const [roomInfo, setRoomInfo] = useState([]);
	useEffect(() => {
		axios.get(`http://localhost:5000/posts/room-types/${registrationID}`).then((response) => {
			setRoomInfo(response.data);
		});
	}, [registrationID]);

	return roomInfo;
}
