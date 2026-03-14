import { KeyboardEvent, useMemo, useState } from 'react';

import { AccountRoleEnum } from '@enums';
import { useAccountsQuery, useUpdateAccountRoleMutation } from '@hooks';
import { Box, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { UsersPagination } from './UsersPagination';
import { UsersSearchBar } from './UsersSearchBar';
import { UsersTable } from './UsersTable';

const PAGE_SIZE = 10;

export function Users() {
	const { t } = useTranslation();
	const { mutateAsync: updateAccountRole, isPending: isUpdatingRole } = useUpdateAccountRoleMutation();

	const [page, setPage] = useState(0);
	const [searchInput, setSearchInput] = useState('');
	const [search, setSearch] = useState('');

	const queryParams = useMemo(
		() => ({ top: PAGE_SIZE, skip: page * PAGE_SIZE, ...(search.trim() && { search: search.trim() }) }),
		[page, search]
	);

	const { data, isLoading, isError } = useAccountsQuery(queryParams);

	const total = data?.count ?? 0;
	const results = data?.results ?? [];
	const totalPages = Math.ceil(total / PAGE_SIZE);
	const hasResults = results.length > 0;
	const hasNextPage = page + 1 < totalPages;
	const currentPageLabel = totalPages === 0 ? 0 : page + 1;

	const handleSearch = () => {
		setPage(0);
		setSearch(searchInput);
	};

	const handleSearchKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') handleSearch();
	};

	const handlePreviousPage = () => setPage((prev) => Math.max(prev - 1, 0));

	const handleNextPage = () => {
		if (hasNextPage) setPage((prev) => prev + 1);
	};

	const handleRoleChange = async (accountId: number, role: AccountRoleEnum) => {
		await updateAccountRole({ accountId, role });
	};

	return (
		<Box sx={{ width: '100%' }}>
			<Stack spacing={3}>
				<Stack spacing={1}>
					<Typography variant="h4">{t('screens.USERS.TITLE')}</Typography>

					<Typography variant="body2" color="text.secondary">
						{t('screens.USERS.DESCRIPTION')}
					</Typography>
				</Stack>

				<UsersSearchBar
					value={searchInput}
					onChange={setSearchInput}
					onSearch={handleSearch}
					onKeyDown={handleSearchKeyDown}
				/>

				<UsersTable
					results={results}
					isLoading={isLoading}
					isError={isError}
					hasResults={hasResults}
					isUpdatingRole={isUpdatingRole}
					onRoleChange={handleRoleChange}
				/>

				<UsersPagination
					page={page}
					currentPageLabel={currentPageLabel}
					totalPages={totalPages}
					hasNextPage={hasNextPage}
					onPrevious={handlePreviousPage}
					onNext={handleNextPage}
				/>
			</Stack>
		</Box>
	);
}
