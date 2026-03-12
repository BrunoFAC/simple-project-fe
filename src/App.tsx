import { AppSuspenseFallback, RootLayout, RouteErrorFallback } from '@components';
import { AccountRoleEnum } from '@enums';
import { useAccount } from '@providers';
import { pages, Pages } from '@routes';
import { Paths } from '@utils';
import { PropsWithChildren, Suspense } from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';

interface AppProtectedRouteProps extends PropsWithChildren {
	access: 'session' | 'guest' | 'admin';
}

const AppSuspense = ({ children }: PropsWithChildren) => (
	<Suspense fallback={<AppSuspenseFallback />}>{children}</Suspense>
);

const AppProtectedRoute = ({ children, access }: AppProtectedRouteProps) => {
	const { isAuthenticated, account, isLoadingAccount, hasCheckedAccountOnce } = useAccount();

	const isAdmin = account?.role === AccountRoleEnum.Admin;

	if (!hasCheckedAccountOnce || isLoadingAccount) return <AppSuspenseFallback />;

	if (access === 'guest' && isAuthenticated) return <Navigate to={Paths.Dashboard} replace />;

	if (access === 'session' && !isAuthenticated) return <Navigate to={Paths.Login} replace />;

	if (access === 'admin') {
		if (!isAuthenticated) return <Navigate to={Paths.Login} replace />;
		if (!isAdmin) return <Navigate to={Paths.Dashboard} replace />;
	}

	return children;
};

const appRoutes = Object.keys(pages).map((screenKey) => {
	const key = screenKey as keyof Pages;
	const { path, Component, access } = pages[key];
	const element = (
		<AppSuspense>
			<AppProtectedRoute access={access}>
				<Component />
			</AppProtectedRoute>
		</AppSuspense>
	);

	return { path, element };
});

const appRouter = createBrowserRouter([
	{
		element: <RootLayout />,
		errorElement: <RouteErrorFallback />,
		children: [...appRoutes, { path: '*', element: <Navigate to={Paths.Dashboard} replace /> }],
	},
]);

export function App() {
	return <RouterProvider router={appRouter} />;
}
// return (
// 	<BrowserRouter>
// 		<Routes>
// 			<Route element={<RootLayout />}>
// 				{appRoutes.map((route) => (
// 					<Route key={route.path} path={route.path} element={route.element} />
// 				))}

// 				<Route path="*" element={<Navigate to={Paths.Dashboard} replace />} />
// 			</Route>
// 		</Routes>
// 	</BrowserRouter>
// );
