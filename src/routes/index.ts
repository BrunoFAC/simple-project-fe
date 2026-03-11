import { Paths } from '@utils';
import { FC, lazy } from 'react';

type ScreenKey = keyof typeof import('@pages');

const lazyScreen = <T extends ScreenKey>(screenName: T) =>
	lazy(() => import('@pages').then((module) => ({ default: module[screenName] })));

export type AppScreen = {
	path: Paths;
	access: 'session' | 'guest';
	Component: React.LazyExoticComponent<FC>;
};
export type Pages = {
	login: AppScreen;
	register: AppScreen;
	dashboard: AppScreen;
	featureFlags: AppScreen;
	users: AppScreen;
	settings: AppScreen;
};

export const pages: Pages = {
	login: { path: Paths.Login, access: 'guest', Component: lazyScreen('Login') },
	register: { path: Paths.Register, access: 'guest', Component: lazyScreen('Register') },
	dashboard: { path: Paths.Dashboard, access: 'session', Component: lazyScreen('Home') },
	featureFlags: { path: Paths.FeatureFlags, access: 'session', Component: lazyScreen('FeatureFlags') },
	users: { path: Paths.Users, access: 'session', Component: lazyScreen('Users') },
	settings: { path: Paths.Settings, access: 'session', Component: lazyScreen('Settings') },
};
