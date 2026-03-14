import { createTheme, type PaletteMode } from '@mui/material/styles';

export function createAppTheme(mode: PaletteMode) {
	const isDark = mode === 'dark';
	return createTheme({
		palette: {
			mode,
			primary: { main: isDark ? '#90caf9' : '#1976d2' },
			secondary: { main: isDark ? '#60588f' : '#4e2d8b' },
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
				styleOverrides: { root: { textTransform: 'none', borderRadius: 8 } },
			},
			MuiCheckbox: {
				defaultProps: { disableTouchRipple: true },
				styleOverrides: { root: { ':hover': { backgroundColor: 'transparent' } } },
			},
			MuiListItemButton: { styleOverrides: { root: { textTransform: 'none', borderRadius: 8, minHeight: 48 } } },
			MuiPaper: { styleOverrides: { root: { backgroundImage: 'none' } } },
			MuiTextField: { defaultProps: { fullWidth: true, size: 'small', variant: 'outlined' } },
			MuiOutlinedInput: { styleOverrides: { root: { borderRadius: 10 } } },
			MuiCard: { styleOverrides: { root: { borderRadius: 14 } } },
			MuiAppBar: { defaultProps: { elevation: 0, color: 'transparent' } },
			MuiDrawer: { styleOverrides: { paper: { borderRight: '1px solid' } } },
			MuiTableRow: { styleOverrides: { root: { '&:last-child td, &:last-child th': { borderBottom: 0 } } } },
		},
	});
}
