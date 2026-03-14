import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { useTranslation } from 'react-i18next';

function AppErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
	const { t } = useTranslation();
	const message = error instanceof Error ? error.message : t('errors.UNEXPECTED_ERROR');

	return (
		<div role="alert" style={{ width: '100%' }}>
			<h2>{t('errors.SOMETHING_WENT_WRONG')}</h2>
			<p>{message}</p>
			<button onClick={resetErrorBoundary}>{t('errors.TRY_AGAIN')}</button>
		</div>
	);
}

export function AppErrorBoundary({ children }: { children: React.ReactNode }) {
	return <ErrorBoundary FallbackComponent={AppErrorFallback}>{children}</ErrorBoundary>;
}
