import { useAccount } from '@providers';
import { eraseCookie, Paths, toast } from '@utils';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export function useLogout() {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const { clearSession } = useAccount();

	return () => {
		eraseCookie('accessToken');
		clearSession();
		toast({ message: t('services.LOGOUT_SUCCESS'), variant: 'info' });
		navigate(Paths.Login, { replace: true });
	};
}
