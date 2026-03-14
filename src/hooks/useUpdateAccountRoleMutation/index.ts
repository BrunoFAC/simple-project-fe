import { updateAccountRole } from '@api';
import { AccountRoleEnum } from '@enums';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@utils';
import { useTranslation } from 'react-i18next';

type Variables = { accountId: number; role: AccountRoleEnum };

export function useUpdateAccountRoleMutation() {
	const queryClient = useQueryClient();
	const { t } = useTranslation();

	return useMutation({
		mutationFn: ({ accountId, role }: Variables) => updateAccountRole(accountId, { role }),
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ['accounts'] });
			toast({ message: t('services.UPDATE_ACCOUNT_ROLE_SUCCESS'), variant: 'success' });
		},
	});
}
