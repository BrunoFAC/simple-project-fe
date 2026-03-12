import { getAccountDetails } from '@api';
import { useQuery } from '@tanstack/react-query';
import { getCookie } from '@utils';
import { JSX, useMemo, useState, type PropsWithChildren } from 'react';

import { AccountSummaryDTO } from '@apiClient';
import { AppSuspenseFallback } from '@components';
import { createContext } from 'react';

export interface IAccountProviderProps {
	children: JSX.Element;
}
export type IAccountContext = {
	account?: AccountSummaryDTO;
	isAuthenticated?: boolean;
	isLoadingAccount?: boolean;
	hasCheckedAccountOnce?: boolean;
	refetchAccount?: () => Promise<void>;
	setSessionToken: (nextToken: string | null) => void;
	clearSession: () => void;
};

export const AccountContext = createContext<IAccountContext | undefined>(undefined);

export function AccountProvider({ children }: PropsWithChildren) {
	const [token, setToken] = useState<string | null>(getCookie('accessToken'));

	const { data, isLoading, isFetched, refetch } = useQuery({
		queryKey: ['account'],
		queryFn: getAccountDetails,
		enabled: !!token,
		retry: false,
	});

	const account = token ? data : undefined;

	const value = useMemo<IAccountContext>(
		() => ({
			account,
			isAuthenticated: !!account?.id,
			isLoadingAccount: !!token && isLoading,
			hasCheckedAccountOnce: !token || isFetched,
			refetchAccount: async () => {
				await refetch();
			},
			setSessionToken: (nextToken: string | null) => setToken(nextToken),
			clearSession: () => setToken(null),
		}),
		[account, isLoading, isFetched, token, refetch]
	);

	if (token && isLoading) return <AppSuspenseFallback />;

	return <AccountContext.Provider value={value}>{children}</AccountContext.Provider>;
}
