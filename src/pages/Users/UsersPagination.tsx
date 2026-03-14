import { Button, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

type UsersPaginationProps = {
	page: number;
	currentPageLabel: number;
	totalPages: number;
	hasNextPage: boolean;
	onPrevious: () => void;
	onNext: () => void;
};

export function UsersPagination({
	page,
	currentPageLabel,
	totalPages,
	hasNextPage,
	onPrevious,
	onNext,
}: UsersPaginationProps) {
	const { t } = useTranslation();

	return (
		<Stack direction="row" alignItems="center" justifyContent="space-between" flexWrap="wrap" gap={2}>
			<Typography variant="body2" color="text.secondary">
				{t('screens.USERS.PAGINATION.PAGE_OF', {
					current: currentPageLabel,
					total: totalPages,
				})}
			</Typography>

			<Stack direction="row" spacing={1}>
				<Button onClick={onPrevious} disabled={page === 0}>
					{t('screens.USERS.PAGINATION.PREVIOUS')}
				</Button>

				<Button onClick={onNext} disabled={!hasNextPage}>
					{t('screens.USERS.PAGINATION.NEXT')}
				</Button>
			</Stack>
		</Stack>
	);
}
