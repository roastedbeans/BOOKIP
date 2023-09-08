import * as Yup from 'yup';

export const createForm = {
	registrationID: '',
	name: '',
	roomType: '',
	bedNumber: '',
	crInclusion: '',
	tvInclusion: '',
	price12h: '',
	price24h: '',
	status: false,
};

export const registerForm = {
	userID: '',
	hotelName: '',
	contactNumber: '',
	street: '',
	city: '',
	province: '',
	country: '',
	zipCode: '',
};

export const bookingForm = {
	roomID: '',
	roomName: '',
	customerName: '',
	customerPhone: '',
	hours: '',
	checkInDate: new Date(),
	checkOutDate: new Date(),
	price: '',
	status: false,
};

export const FormSchema = Yup.object({
	name: Yup.string()
		.min(3)
		.max(50)
		.required(),
	roomType: Yup.string()
		.min(3)
		.max(50)
		.required(),
	bedNumber: Yup.string()
		.min(3)
		.max(50)
		.required(),
	crInclusion: Yup.string()
		.min(3)
		.max(50)
		.required(),
	tvInclusion: Yup.string()
		.min(3)
		.max(50)
		.required(),
	price12h: Yup.string()
		.min(2)
		.max(50)
		.required(),
	price24h: Yup.string()
		.min(2)
		.max(50)
		.required(),
	status: Yup.boolean().required(),
});

export const bedNumberOptions = [
	{ value: '1 bed', label: '1 bed' },
	{ value: '2 beds', label: '2 beds' },
	{ value: '3 beds', label: '3 beds' },
	{ value: '4 beds', label: '4 beds' },
	{ value: '5 beds', label: '5 beds' },
];
export const crInclusionOptions = [
	{ value: 'with CR', label: 'with CR' },
	{ value: 'without CR', label: 'without CR' },
];
export const tvInclusionOptions = [
	{ value: 'with TV', label: 'with TV' },
	{ value: 'without TV', label: 'without TV' },
];
export const roomTypeOptions = [
	{ value: 'Ordinary', label: 'Ordinary' },
	{ value: 'Airconditioned', label: 'Airconditioned' },
];
export const hoursOptions = [
	{ value: '12 hours', label: '12 hours' },
	{ value: '24 hours', label: '24 hours' },
];
