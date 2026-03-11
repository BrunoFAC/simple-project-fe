import { getAccountDetails, login } from '@api';
import { useAccount } from '@providers';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Paths, setCookie, toast } from '@utils';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export function useLoginMutation() {
	const queryClient = useQueryClient();
	const { t } = useTranslation();
	const navigate = useNavigate();
	const { setSessionToken } = useAccount();

	return useMutation({
		mutationFn: login,
		onSuccess: async ({ token }) => {
			setCookie('accessToken', token, 15);
			setSessionToken(token);
			await queryClient.fetchQuery({ queryKey: ['account'], queryFn: getAccountDetails });
			toast({ message: t('services.LOGIN_SUCCESS'), variant: 'success' });
			navigate(Paths.Dashboard, { replace: true });
		},
	});
}
