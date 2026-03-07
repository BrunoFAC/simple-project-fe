import { Paths } from '@utils';
import { FC, lazy } from 'react';

type ScreenKey = keyof typeof import('@screens');

const lazyScreen = <T extends ScreenKey>(screenName: T) =>
	lazy(() => import('@screens').then((module) => ({ default: module[screenName] })));

export type AppScreen = {
	path: Paths;
	Component: React.LazyExoticComponent<FC>;
};
export type Screens = {
	home: AppScreen;
	sample: AppScreen;
};

export const screens: Screens = {
	home: { path: Paths.Home, Component: lazyScreen('Home') },
	sample: { path: Paths.Sample, Component: lazyScreen('Sample') },
};
