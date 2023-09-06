export const themes = (theme) => ({
	...theme,
	colors: { ...theme.colors, primary: '#121212', primary25: '#DDD0F6' },
});

export const customStyles = {
	control: (provided, state) => ({
		...provided,
		borderColor: state.isFocused ? '#121212' : '#E7E5E4',
		borderWidth: '1px',
		outline: 'none',
		ring: 'none',
		boxShadow: '0 0.5px 1.5px 0.05px #E7E5E4',
		cursor: 'pointer',
		//add shadow thin no focus
	}),
};

export const modalCustomStyles = {
	modal: {
		backgroundColor: 'white',
		borderRadius: '16px',
	},
};
