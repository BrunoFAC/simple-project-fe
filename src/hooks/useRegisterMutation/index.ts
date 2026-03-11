import { register } from '@api';
import { useMutation } from '@tanstack/react-query';
import { Paths, toast } from '@utils';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export function useRegisterMutation() {
	const { t } = useTranslation();
	const navigate = useNavigate();

	return useMutation({
		mutationFn: register,
		onSuccess: async () => {
			toast({ message: t('services.LOGIN_SUCCESS'), variant: 'success' });
			navigate(Paths.Login, { replace: true });
		},
	});
}
