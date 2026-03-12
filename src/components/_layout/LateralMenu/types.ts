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
	{
		label: 'components.LATERAL_MENU.ITEMS.DASHBOARD',
		path: Paths.Dashboard,
		icon: DashboardRoundedIcon,
		requiresPermissions: false,
	},
	{
		label: 'components.LATERAL_MENU.ITEMS.FEATURE_FLAGS',
		path: Paths.FeatureFlags,
		icon: FlagRoundedIcon,
		requiresPermissions: true,
	},
	{
		label: 'components.LATERAL_MENU.ITEMS.USERS',
		path: Paths.Users,
		icon: GroupRoundedIcon,
		requiresPermissions: true,
	},
	{
		label: 'components.LATERAL_MENU.ITEMS.SETTINGS',
		path: Paths.Settings,
		icon: SettingsRoundedIcon,
		requiresPermissions: false,
	},
];
