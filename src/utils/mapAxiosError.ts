import { errorMessages, statusMessages } from '@utils';
import i18next from 'i18next';

export function mapAxiosError(err: unknown): string {
	const axiosError = err as { response?: { data?: { error?: number }; status?: number } };

	const errorCode = axiosError?.response?.data?.error;
	const statusCode = axiosError?.response?.status;

	if (errorCode !== undefined && errorMessages[errorCode]) {
		return i18next.t(errorMessages[errorCode]);
	}

	if (statusCode !== undefined && statusMessages[statusCode]) {
		return i18next.t(statusMessages[statusCode]);
	}

	return i18next.t('errors.UNEXPECTED_ERROR');
}
