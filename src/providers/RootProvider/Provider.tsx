import { AppErrorBoundary, AppSuspenseFallback } from '@components';
import { AccountProvider, AppThemeProvider, ReactQueryProvider } from '@providers';
import { Suspense } from 'react';
import { App } from '../../App';

export function RootProvider() {
	return (
		<AppErrorBoundary>
			<AppThemeProvider>
				<ReactQueryProvider>
					<AccountProvider>
						<Suspense fallback={<AppSuspenseFallback />}>
							<App />
						</Suspense>
					</AccountProvider>
				</ReactQueryProvider>
			</AppThemeProvider>
		</AppErrorBoundary>
	);
}
