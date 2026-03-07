import { config } from '@config';
import { getCookie, mapAxiosError } from '@utils';
import Axios from 'axios';
import i18next from 'i18next';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

// Standard Axios instance
export const apiAxios = Axios.create({ baseURL: config.apiUrl, headers: { 'Content-Type': 'application/json' } });

apiAxios.interceptors.request.use(
	async (conf) => {
		const newConfig = conf;

		// Set up timeout with AbortController
		const controller = new AbortController();
		newConfig.signal = controller.signal;

		setTimeout(() => {
			controller.abort();
		}, 30000); // abort after 30 seconds

		const token = getCookie('accessToken');

		if (token) newConfig.headers!.Authorization = `Bearer ${token}`;

		return newConfig;
	},
	(error) => {
		const message = mapAxiosError(error);
		console.error({ message });
		return Promise.reject(error);
	}
);

i18next
	.use(Backend)
	.use(initReactI18next) // bind react-i18next to the instance
	.init({ backend: { loadPath: '/locales/{{lng}}.json' }, fallbackLng: 'en', debug: config.isDevelopment });
