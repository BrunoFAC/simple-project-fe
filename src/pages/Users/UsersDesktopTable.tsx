import { AccountListDTO } from '@apiClient';
import { AccountRoleEnum } from '@enums';
import {
	Box,
	CircularProgress,
	MenuItem,
	Paper,
	Select,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from '@mui/material';
import { useAccount } from '@providers';
import { useTranslation } from 'react-i18next';

const TABLE_COLUMNS_COUNT = 6;

type UsersDesktopTableProps = {
	results: AccountListDTO[];
	isLoading: boolean;
	isError: boolean;
	hasResults: boolean;
	isUpdatingRole: boolean;
	onRoleChange: (accountId: number, role: AccountRoleEnum) => Promise<void>;
};

export function UsersDesktopTable({
	results,
	isLoading,
	isError,
	hasResults,
	isUpdatingRole,
	onRoleChange,
}: UsersDesktopTableProps) {
	const { t } = useTranslation();
	const { account: loggedInAccount } = useAccount();

	const renderRoleCell = (user: AccountListDTO) => {
		const isOwnAccount = loggedInAccount?.id === user.id;

		if (isOwnAccount) {
			return (
				<Stack spacing={0.5}>
					<Typography variant="body2">{t(`account.ROLE.${user.role}`)}</Typography>
					<Typography variant="caption" color="text.secondary">
						{t('screens.USERS.ACTIONS.CANNOT_EDIT_OWN_ROLE')}
					</Typography>
				</Stack>
			);
		}

		return (
			<Select
				size="small"
				value={user.role}
				disabled={isUpdatingRole}
				onChange={(event) => onRoleChange(user.id, Number(event.target.value) as AccountRoleEnum)}
				sx={{ minWidth: 140 }}
			>
				<MenuItem value={AccountRoleEnum.Member}>{t(`account.ROLE.${AccountRoleEnum.Member}`)}</MenuItem>

				<MenuItem value={AccountRoleEnum.Admin}>{t(`account.ROLE.${AccountRoleEnum.Admin}`)}</MenuItem>
			</Select>
		);
	};

	const renderBody = () => {
		if (isLoading) {
			return (
				<TableRow>
					<TableCell colSpan={TABLE_COLUMNS_COUNT} align="center">
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								py: 4,
								width: '100%',
							}}
						>
							<CircularProgress size={28} />
						</Box>
					</TableCell>
				</TableRow>
			);
		}

		if (isError) {
			return (
				<TableRow>
					<TableCell colSpan={TABLE_COLUMNS_COUNT} align="center">
						<Typography color="error">{t('screens.USERS.STATES.LOAD_ERROR')}</Typography>
					</TableCell>
				</TableRow>
			);
		}

		if (!hasResults) {
			return (
				<TableRow>
					<TableCell colSpan={TABLE_COLUMNS_COUNT} align="center">
						<Typography color="text.secondary">{t('screens.USERS.STATES.EMPTY')}</Typography>
					</TableCell>
				</TableRow>
			);
		}

		return results.map((user) => (
			<TableRow key={user.id} hover>
				<TableCell>{user.id}</TableCell>
				<TableCell>{user.username}</TableCell>
				<TableCell>{user.email}</TableCell>
				<TableCell>{renderRoleCell(user)}</TableCell>
				<TableCell>{new Date(user.creationDate).toLocaleDateString('pt-PT')}</TableCell>
				<TableCell>{new Date(user.updateDate).toLocaleDateString('pt-PT')}</TableCell>
			</TableRow>
		));
	};

	return (
		<Paper sx={{ overflow: 'hidden', borderRadius: 3 }}>
			<TableContainer sx={{ overflowX: 'auto' }}>
				<Table sx={{ minWidth: 720 }}>
					<TableHead>
						<TableRow>
							<TableCell>{t('screens.USERS.TABLE.ID')}</TableCell>
							<TableCell>{t('screens.USERS.TABLE.USERNAME')}</TableCell>
							<TableCell>{t('screens.USERS.TABLE.EMAIL')}</TableCell>
							<TableCell>{t('screens.USERS.TABLE.ROLE')}</TableCell>
							<TableCell>{t('screens.USERS.TABLE.CREATED_AT')}</TableCell>
							<TableCell>{t('screens.USERS.TABLE.UPDATED_AT')}</TableCell>
						</TableRow>
					</TableHead>

					<TableBody>{renderBody()}</TableBody>
				</Table>
			</TableContainer>
		</Paper>
	);
}
