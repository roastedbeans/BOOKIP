export const themes = (theme) => ({
	...theme,
	colors: { ...theme.colors, primary: 'black', primary25: '#aaaaaa' },
});
