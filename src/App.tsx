import { AppSuspenseFallback, RootLayout, RouteErrorFallback } from '@components';
import { screens, Screens } from '@routes';
import { Paths } from '@utils';
import { PropsWithChildren, Suspense } from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';

const AppSuspense = ({ children }: PropsWithChildren) => (
	<Suspense fallback={<AppSuspenseFallback />}>{children}</Suspense>
);

const appRoutes = Object.keys(screens).map((screenKey) => {
	const key = screenKey as keyof Screens;
	const { path, Component } = screens[key];
	const element = (
		<AppSuspense>
			<Component />
		</AppSuspense>
	);

	return { path, element };
});

const appRouter = createBrowserRouter([
	{
		element: <RootLayout />,
		errorElement: <RouteErrorFallback />,
		children: [...appRoutes, { path: '*', element: <Navigate to={Paths.Home} replace /> }],
	},
]);

export function App() {
	return <RouterProvider router={appRouter} />;
}
