import { AppErrorBoundary, AppSuspenseFallback } from '@components';
import { AccountProvider, AppThemeProvider, ReactQueryProvider } from '@providers';
import { Suspense, type PropsWithChildren } from 'react';

export const RootProvider = ({ children }: PropsWithChildren) => {
	return (
		<AppErrorBoundary>
			<AppThemeProvider>
				<ReactQueryProvider>
					<AccountProvider>
						<Suspense fallback={<AppSuspenseFallback />}>{children}</Suspense>
					</AccountProvider>
				</ReactQueryProvider>
			</AppThemeProvider>
		</AppErrorBoundary>
	);
};
