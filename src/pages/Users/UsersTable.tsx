import { AccountRoleEnum } from '@enums';
import { useMediaQuery, useTheme } from '@mui/material';

import { AccountListDTO } from '@apiClient';
import { UsersDesktopTable } from './UsersDesktopTable';
import { UsersMobileList } from './UsersMobileList';

type UsersTableProps = {
	results: AccountListDTO[];
	isLoading: boolean;
	isError: boolean;
	hasResults: boolean;
	isUpdatingRole: boolean;
	onRoleChange: (accountId: number, role: AccountRoleEnum) => Promise<void>;
};

export function UsersTable(props: UsersTableProps) {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
	if (isMobile) return <UsersMobileList {...props} />;
	return <UsersDesktopTable {...props} />;
}
