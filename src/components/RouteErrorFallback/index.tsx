import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Paths } from '@utils';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export function RouteErrorFallback() {
	const navigate = useNavigate();
	const { t } = useTranslation();

	return (
		<Stack
			spacing={2}
			alignItems="center"
			justifyContent="center"
			sx={{ minHeight: '100vh', px: 3, textAlign: 'center' }}
		>
			<ReportProblemOutlinedIcon fontSize="large" />
			<Typography variant="h4">{t('router.TITLE')}</Typography>
			<Typography variant="body1" color="text.secondary">
				{t('router.TITLE')}
			</Typography>

			<Stack direction="row" spacing={2}>
				<Button variant="outlined" onClick={() => navigate(-1)}>
					{t('components.GO_BACK.BACK')}
				</Button>
				<Button variant="contained" onClick={() => navigate(Paths.Home, { replace: true })}>
					{t('components.GO_BACK.HOME')}
				</Button>
			</Stack>
		</Stack>
	);
}
