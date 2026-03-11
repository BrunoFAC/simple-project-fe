import { useEffect, useState } from 'react';

import { Outlet, useLocation } from 'react-router-dom';

import { Box, Toolbar, useMediaQuery, useTheme } from '@mui/material';
import { useAccount } from '@providers';
import { Header } from '../Header';
import { LateralMenu } from '../LateralMenu';

export const DRAWER_WIDTH = 280;

export function RootLayout() {
	const { pathname } = useLocation();
	const { isAuthenticated } = useAccount();

	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));
	const [mobileOpen, setMobileOpen] = useState<boolean>(false);

	const handleDrawerToggle = () => setMobileOpen((prevState) => !prevState);

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'auto' });
	}, [pathname]);

	return (
		<Box sx={{ display: 'flex', flex: 1, minHeight: '100vh', bgcolor: 'background.default' }}>
			{isAuthenticated ? (
				<>
					{isMobile && <Header theme={theme} handleDrawerToggle={handleDrawerToggle} />}{' '}
					<LateralMenu mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
					<Box
						component="main"
						sx={{
							flexGrow: 1,
							...(isAuthenticated && { width: { md: `calc(100% - ${DRAWER_WIDTH}px)` } }),
							p: 3,
						}}
					>
						{isMobile && <Toolbar sx={{ minHeight: 72 }} />}
						<Outlet />
					</Box>
				</>
			) : (
				<Outlet />
			)}
		</Box>
	);
}
