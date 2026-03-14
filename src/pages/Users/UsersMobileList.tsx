import { AccountRoleEnum } from '@enums';
import { Box, CircularProgress, MenuItem, Paper, Select, Stack, Typography } from '@mui/material';
import { useAccount } from '@providers';
import { useTranslation } from 'react-i18next';

import { AccountListDTO } from '@apiClient';

type UsersMobileListProps = {
	results: AccountListDTO[];
	isLoading: boolean;
	isError: boolean;
	hasResults: boolean;
	isUpdatingRole: boolean;
	onRoleChange: (accountId: number, role: AccountRoleEnum) => Promise<void>;
};

export function UsersMobileList({
	results,
	isLoading,
	isError,
	hasResults,
	isUpdatingRole,
	onRoleChange,
}: UsersMobileListProps) {
	const { t } = useTranslation();
	const { account: loggedInAccount } = useAccount();

	if (isLoading) {
		return (
			<Paper sx={{ borderRadius: 3, p: 4 }}>
				<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
					<CircularProgress size={28} />
				</Box>
			</Paper>
		);
	}

	if (isError) {
		return (
			<Paper sx={{ borderRadius: 3, p: 3 }}>
				<Typography color="error" align="center">
					{t('screens.USERS.STATES.LOAD_ERROR')}
				</Typography>
			</Paper>
		);
	}

	if (!hasResults) {
		return (
			<Paper sx={{ borderRadius: 3, p: 3 }}>
				<Typography color="text.secondary" align="center">
					{t('screens.USERS.STATES.EMPTY')}
				</Typography>
			</Paper>
		);
	}

	return (
		<Stack spacing={2}>
			{results.map((user) => {
				const isOwnAccount = loggedInAccount?.id === user.id;

				return (
					<Paper key={user.id} sx={{ borderRadius: 3, p: 2.5 }}>
						<Stack spacing={2}>
							<Stack spacing={0.5}>
								<Typography variant="subtitle1" fontWeight={600}>
									{user.username}
								</Typography>

								<Typography variant="body2" color="text.secondary">
									{user.email}
								</Typography>
							</Stack>

							<Stack direction="row" gap={1} alignItems="center">
								<Typography variant="body2" color="text.secondary">
									{t('screens.USERS.TABLE.ID')}:
								</Typography>
								<Typography variant="body2">{user.id}</Typography>
							</Stack>

							<Stack direction="column">
								<Typography variant="body2" color="text.secondary">
									{t('screens.USERS.TABLE.CREATED_AT')}
								</Typography>

								<Typography variant="body2">
									{new Date(user.creationDate).toLocaleDateString('pt-PT')}
								</Typography>
							</Stack>

							<Stack direction="column">
								<Typography variant="body2" color="text.secondary">
									{t('screens.USERS.TABLE.UPDATED_AT')}
								</Typography>

								<Typography variant="body2">
									{new Date(user.updateDate).toLocaleDateString('pt-PT')}
								</Typography>
							</Stack>

							<Stack spacing={1}>
								<Typography variant="body2" color="text.secondary">
									{t('screens.USERS.TABLE.ROLE')}
								</Typography>

								{isOwnAccount ? (
									<Stack spacing={0.5}>
										<Typography variant="body2">{t(`account.ROLE.${user.role}`)}</Typography>
										<Typography variant="caption" color="text.secondary">
											{t('screens.USERS.ACTIONS.CANNOT_EDIT_OWN_ROLE')}
										</Typography>
									</Stack>
								) : (
									<Select
										size="small"
										value={user.role}
										disabled={isUpdatingRole}
										onChange={(event) =>
											onRoleChange(user.id, Number(event.target.value) as AccountRoleEnum)
										}
										fullWidth
									>
										<MenuItem value={AccountRoleEnum.Member}>
											{t(`account.ROLE.${AccountRoleEnum.Member}`)}
										</MenuItem>

										<MenuItem value={AccountRoleEnum.Admin}>
											{t(`account.ROLE.${AccountRoleEnum.Admin}`)}
										</MenuItem>
									</Select>
								)}
							</Stack>
						</Stack>
					</Paper>
				);
			})}
		</Stack>
	);
}
