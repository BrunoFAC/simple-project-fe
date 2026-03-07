import { Paths } from '@utils';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const defaultStyle: React.CSSProperties = {
	display: 'flex',
	flexDirection: 'row',
	width: '100%',
	alignItems: 'center',
	justifyContent: 'start',
	gap: 12,
};

const resources = {
	titleSample: 'screens.HOME.TITLE_SAMPLE',
	buttonSample: 'screens.HOME.BUTTON_SAMPLE',
};

export function Home() {
	const navigate = useNavigate();
	const { t } = useTranslation();

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				gap: '20px',
				width: '100%',
			}}
		>
			<div style={defaultStyle}>
				<h1>{t(resources.titleSample)}</h1>
				<button onClick={() => navigate(Paths.Sample)}>{t(resources.buttonSample)}</button>
			</div>
		</div>
	);
}
