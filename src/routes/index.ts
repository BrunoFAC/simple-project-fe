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
	home: AppScreen;
	login: AppScreen;
	register: AppScreen;
};

export const pages: Pages = {
	home: { path: Paths.Home, access: 'session', Component: lazyScreen('Home') },
	login: { path: Paths.Login, access: 'guest', Component: lazyScreen('Login') },
	register: { path: Paths.Register, access: 'guest', Component: lazyScreen('Register') },
};
