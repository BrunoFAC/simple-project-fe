import { Box, Drawer, useTheme } from '@mui/material';
import { useAppThemeMode } from '@providers';
import { DRAWER_WIDTH } from '../RootLayout';
import { DrawerContent } from './content';

type LateralMenuProps = { mobileOpen: boolean; handleDrawerToggle: () => void };

export function LateralMenu({ mobileOpen, handleDrawerToggle }: LateralMenuProps) {
	const theme = useTheme();
	const { mode } = useAppThemeMode();
	const isDarkMode = mode === 'dark';

	return (
		<Box component="nav" sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}>
			<Drawer
				variant="temporary"
				open={mobileOpen}
				onClose={handleDrawerToggle}
				ModalProps={{ keepMounted: true }}
				sx={{
					display: { xs: 'block', md: 'none' },
					'& .MuiDrawer-paper': { width: DRAWER_WIDTH, boxSizing: 'border-box' },
				}}
			>
				<DrawerContent handleDrawerToggle={handleDrawerToggle} isDarkMode={isDarkMode} />
			</Drawer>

			<Drawer
				open
				variant="permanent"
				sx={{
					display: { xs: 'none', md: 'block' },
					'& .MuiDrawer-paper': {
						width: DRAWER_WIDTH,
						boxSizing: 'border-box',
						borderRight: `1px solid ${theme.palette.divider}`,
						bgcolor: 'background.paper',
					},
				}}
			>
				<DrawerContent handleDrawerToggle={handleDrawerToggle} isDarkMode={isDarkMode} />
			</Drawer>
		</Box>
	);
}
