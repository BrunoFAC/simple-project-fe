import { useAccount } from '@providers';
import { useQueryClient } from '@tanstack/react-query';
import { eraseCookie, Paths, toast } from '@utils';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export function useLogout() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { t } = useTranslation();
	const { clearSession } = useAccount();

	return () => {
		eraseCookie('accessToken');
		clearSession();
		queryClient.removeQueries({ queryKey: ['account'] });
		queryClient.setQueryData(['account'], undefined);

		toast({ message: t('services.LOGOUT_SUCCESS'), variant: 'info' });

		navigate(Paths.Login, { replace: true });
	};
}
