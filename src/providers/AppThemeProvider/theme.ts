import { createTheme, type PaletteMode } from '@mui/material/styles';

export const createAppTheme = (mode: PaletteMode) => {
	const isDark = mode === 'dark';
	return createTheme({
		palette: {
			mode,
			primary: { main: isDark ? '#90caf9' : '#1976d2' },
			secondary: { main: isDark ? '#ce93d8' : '#9c27b0' },
			background: { default: isDark ? '#161616' : '#f8fafc', paper: isDark ? '#1a1c1f' : '#ffffff' },
		},
		shape: { borderRadius: 8 },
		typography: {
			fontFamily: `'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif`,
			h1: { fontSize: '2rem', fontWeight: 700 },
			h2: { fontSize: '1.5rem', fontWeight: 700 },
		},
		components: {
			MuiButton: {
				defaultProps: { disableElevation: true },
				styleOverrides: { root: { textTransform: 'none', borderRadius: 10 } },
			},
			MuiPaper: { styleOverrides: { root: { backgroundImage: 'none' } } },
			MuiTextField: { defaultProps: { fullWidth: true, size: 'small', variant: 'outlined' } },
			MuiOutlinedInput: { styleOverrides: { root: { borderRadius: 10 } } },
			MuiCard: { styleOverrides: { root: { borderRadius: 14 } } },
			MuiAppBar: { defaultProps: { elevation: 0, color: 'transparent' } },
			MuiDrawer: { styleOverrides: { paper: { borderRight: '1px solid' } } },
		},
	});
};
