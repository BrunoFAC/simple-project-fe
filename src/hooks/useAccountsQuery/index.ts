import { useQuery } from '@tanstack/react-query';

import { getAccounts } from '@api';
import { AccountsQuery } from '@apiClient';

export function useAccountsQuery(params: AccountsQuery) {
	return useQuery({
		queryKey: ['accounts', params],
		queryFn: () => getAccounts(params),
	});
}
