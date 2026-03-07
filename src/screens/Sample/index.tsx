import { useTranslation } from 'react-i18next';

const resources = { title: 'screens.SAMPLE.TITLE' };

export function Sample() {
	const { t } = useTranslation();

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				width: '100%',
				justifyContent: 'start',
			}}
		>
			<h1>{t(resources.title)}</h1>
		</div>
	);
}
