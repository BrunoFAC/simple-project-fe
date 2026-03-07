import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, type PaletteMode } from '@mui/material/styles';
import { createContext, useCallback, useContext, useMemo, useState, type PropsWithChildren } from 'react';

import { createAppTheme } from './theme';

type ThemeModeContextType = {
	mode: PaletteMode;
	toggleColorMode: () => void;
	setMode: (mode: PaletteMode) => void;
};

const ThemeModeContext = createContext<ThemeModeContextType | undefined>(undefined);

const STORAGE_KEY = 'app-theme-mode';

const getInitialMode = (): PaletteMode => {
	const savedMode = localStorage.getItem(STORAGE_KEY);
	if (savedMode === 'light' || savedMode === 'dark') return savedMode;
	return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export const AppThemeProvider = ({ children }: PropsWithChildren) => {
	const [mode, setModeState] = useState<PaletteMode>(getInitialMode);

	const setMode = useCallback((nextMode: PaletteMode) => {
		setModeState(nextMode);
		localStorage.setItem(STORAGE_KEY, nextMode);
	}, []);

	const toggleColorMode = useCallback(() => {
		setModeState((prevMode) => {
			const nextMode = prevMode === 'light' ? 'dark' : 'light';
			localStorage.setItem(STORAGE_KEY, nextMode);
			return nextMode;
		});
	}, []);

	const theme = useMemo(() => createAppTheme(mode), [mode]);

	const value = useMemo(() => ({ mode, toggleColorMode, setMode }), [mode, toggleColorMode, setMode]);

	return (
		<ThemeModeContext.Provider value={value}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				{children}
			</ThemeProvider>
		</ThemeModeContext.Provider>
	);
};

export const useAppThemeMode = () => {
	const context = useContext(ThemeModeContext);
	if (!context) throw new Error('useAppThemeMode must be used within AppThemeProvider');
	return context;
};
