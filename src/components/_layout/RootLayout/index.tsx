import { useEffect } from 'react';

import Box from '@mui/material/Box';
import { Outlet, useLocation } from 'react-router-dom';

export function RootLayout() {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'auto' });
	}, [pathname]);

	return (
		<Box
			component="main"
			sx={{
				display: 'flex',
				width: '100%',
				minHeight: '100vh',
				flex: '1 1 auto',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<Outlet />
		</Box>
	);
}
