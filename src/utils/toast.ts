import { enqueueSnackbar } from 'notistack';

export const toast = ({ message, variant }: { message: string; variant: 'success' | 'error' | 'warning' | 'info' }) => {
	enqueueSnackbar(message, { variant });
};
