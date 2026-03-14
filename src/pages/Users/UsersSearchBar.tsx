import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { Button, InputAdornment, Stack, TextField } from '@mui/material';
import { KeyboardEventHandler } from 'react';
import { useTranslation } from 'react-i18next';

type UsersSearchBarProps = {
	value: string;
	onChange: (value: string) => void;
	onSearch: () => void;
	onKeyDown: KeyboardEventHandler<HTMLInputElement>;
};

export function UsersSearchBar({ value, onChange, onSearch, onKeyDown }: UsersSearchBarProps) {
	const { t } = useTranslation();

	return (
		<Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
			<TextField
				fullWidth
				placeholder={t('screens.USERS.SEARCH_PLACEHOLDER')}
				value={value}
				onChange={(event) => onChange(event.target.value)}
				onKeyDown={onKeyDown}
				slotProps={{
					input: {
						startAdornment: (
							<InputAdornment position="start">
								<SearchRoundedIcon />
							</InputAdornment>
						),
					},
				}}
			/>

			<Button variant="contained" onClick={onSearch}>
				{t('screens.USERS.SEARCH_BUTTON')}
			</Button>
		</Stack>
	);
}
