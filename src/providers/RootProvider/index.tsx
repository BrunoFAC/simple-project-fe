import { AppErrorBoundary, AppSuspenseFallback } from '@components';
import { AccountProvider, AppThemeProvider, ReactQueryProvider, ToastProvider } from '@providers';
import { Suspense } from 'react';
import { App } from '../../App';

export function RootProvider() {
	return (
		<AppErrorBoundary>
			<AppThemeProvider>
				<ToastProvider>
					<ReactQueryProvider>
						<AccountProvider>
							<Suspense fallback={<AppSuspenseFallback />}>
								<App />
							</Suspense>
						</AccountProvider>
					</ReactQueryProvider>
				</ToastProvider>
			</AppThemeProvider>
		</AppErrorBoundary>
	);
}
