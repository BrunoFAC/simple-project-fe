import MenuRoundedIcon from '@mui/icons-material/MenuRounded';

import { AppBar, Box, IconButton, Stack, Theme, Toolbar, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { DRAWER_WIDTH } from '../RootLayout';

type HeaderProps = { handleDrawerToggle: () => void; theme: Theme };

export function Header({ theme, handleDrawerToggle }: HeaderProps) {
	const { t } = useTranslation();
	return (
		<Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
			<AppBar
				position="fixed"
				color="inherit"
				elevation={0}
				sx={{
					width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
					ml: { md: `${DRAWER_WIDTH}px` },
					borderBottom: `1px solid ${theme.palette.divider}`,
					bgcolor: 'background.paper',
				}}
			>
				<Toolbar sx={{ minHeight: 72 }}>
					<Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ width: '100%' }}>
						<Stack direction="row" alignItems="center" spacing={1}>
							<IconButton edge="start" onClick={handleDrawerToggle}>
								<MenuRoundedIcon />
							</IconButton>
							<Typography variant="subtitle1" fontWeight={700}>
								{t('components.HEADER.TITLE')}
							</Typography>
						</Stack>
					</Stack>
				</Toolbar>
			</AppBar>
		</Box>
	);
}
