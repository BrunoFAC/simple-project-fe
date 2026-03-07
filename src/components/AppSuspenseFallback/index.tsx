import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export function AppSuspenseFallback() {
	return (
		<Backdrop open sx={(theme) => ({ color: theme.palette.primary.main, zIndex: theme.zIndex.drawer + 1 })}>
			<CircularProgress color="inherit" />
		</Backdrop>
	);
}
