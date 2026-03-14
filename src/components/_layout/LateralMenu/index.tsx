import { Box, Drawer, useTheme } from '@mui/material';
import { DRAWER_WIDTH } from '../RootLayout';
import { DrawerContent } from './DrawerContent';

type LateralMenuProps = { mobileOpen: boolean; handleDrawerToggle: () => void };

export function LateralMenu({ mobileOpen, handleDrawerToggle }: LateralMenuProps) {
	const theme = useTheme();

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
				<DrawerContent handleDrawerToggle={handleDrawerToggle} />
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
				<DrawerContent handleDrawerToggle={handleDrawerToggle} />
			</Drawer>
		</Box>
	);
}
