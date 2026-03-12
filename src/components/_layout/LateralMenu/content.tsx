import { AccountRoleEnum } from '@enums';
import { useLogout } from '@hooks';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import {
	Box,
	Divider,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Stack,
	Typography,
	useMediaQuery,
	useTheme,
} from '@mui/material';
import { useAccount } from '@providers';
import { Paths } from '@utils';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { navigationItems } from './types';

type DrawerContentProps = { onToggleTheme?: () => void; handleDrawerToggle: () => void; isDarkMode?: boolean };

export function DrawerContent({ isDarkMode, handleDrawerToggle, onToggleTheme }: DrawerContentProps) {
	const { t } = useTranslation();
	const { account } = useAccount();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));

	const handleLogout = useLogout();

	const isRouteActive = (path: string) => {
		if (path === Paths.Dashboard) return location.pathname === Paths.Dashboard;
		return location.pathname.startsWith(path);
	};

	const isAdmin = account?.role === AccountRoleEnum.Admin;

	return (
		<Stack sx={{ height: '100%' }}>
			<Box sx={{ px: 2.5, py: 2 }}>
				<Stack direction="row" spacing={1.5} alignItems="center">
					<Box
						sx={{
							width: 40,
							height: 40,
							borderRadius: 2,
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							bgcolor: 'primary.main',
							color: 'primary.contrastText',
							fontWeight: 700,
							fontSize: 18,
						}}
					>
						F
					</Box>

					<Box>
						<Typography variant="subtitle1" fontWeight={700}>
							{t('components.LATERAL_MENU.TITLE')}
						</Typography>
						<Typography variant="caption" color="text.secondary">
							{t('components.LATERAL_MENU.DESCRIPTION')}
						</Typography>
					</Box>
				</Stack>
			</Box>

			<Divider />

			<Box sx={{ px: 1.5, py: 2, flex: 1 }}>
				<List disablePadding>
					{navigationItems
						.filter((e) => (e.requiresPermissions ? isAdmin : true))
						.map((item) => {
							const active = isRouteActive(item.path);
							const Icon = item.icon;

							return (
								<ListItemButton
									key={item.path}
									component={Link}
									to={item.path}
									onClick={isMobile ? handleDrawerToggle : undefined}
									sx={{
										mb: 0.5,
										bgcolor: active ? 'action.selected' : 'transparent',
										color: active ? 'text.primary' : 'text.secondary',
										'&:hover': { bgcolor: 'action.hover' },
									}}
								>
									<ListItemIcon sx={{ minWidth: 40, color: active ? 'primary.main' : 'inherit' }}>
										<Icon />
									</ListItemIcon>

									<ListItemText primary={t(item.label)} />
								</ListItemButton>
							);
						})}
				</List>
			</Box>

			<Divider />

			<Box sx={{ p: 1.5 }}>
				<List disablePadding>
					<ListItemButton onClick={onToggleTheme} sx={{ mb: 0.5 }}>
						<ListItemIcon sx={{ minWidth: 40 }}>
							{isDarkMode ? <LightModeRoundedIcon /> : <DarkModeRoundedIcon />}
						</ListItemIcon>
						<ListItemText primary={isDarkMode ? 'Light mode' : 'Dark mode'} />
					</ListItemButton>

					<ListItemButton onClick={handleLogout} sx={{ color: 'error.main' }}>
						<ListItemIcon sx={{ minWidth: 40, color: 'error.main' }}>
							<LogoutRoundedIcon />
						</ListItemIcon>
						<ListItemText primary="Logout" />
					</ListItemButton>
				</List>
			</Box>
		</Stack>
	);
}
