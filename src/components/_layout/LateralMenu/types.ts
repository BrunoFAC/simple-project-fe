import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import FlagRoundedIcon from '@mui/icons-material/FlagRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import { Paths } from '@utils';
import { PropsWithChildren } from 'react';

export type LateralMenuProps = PropsWithChildren<{
	onLogout?: () => void;
	onToggleTheme?: () => void;
	handleDrawerToggle: () => void;
	isDarkMode?: boolean;
}>;

export const navigationItems = [
	{ label: 'components.LATERAL_MENU.ITEMS.DASHBOARD', path: Paths.Home, icon: DashboardRoundedIcon },
	{ label: 'components.LATERAL_MENU.ITEMS.FEATURE_FLAGS', path: '/feature-flags', icon: FlagRoundedIcon },
	{ label: 'components.LATERAL_MENU.ITEMS.USERS', path: '/users', icon: GroupRoundedIcon },
	{ label: 'components.LATERAL_MENU.ITEMS.SETTINGS', path: '/settings', icon: SettingsRoundedIcon },
];
