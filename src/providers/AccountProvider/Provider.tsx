import { AccountDetailsDTO, getAccountDetails } from '@api';
import { useQuery } from '@tanstack/react-query';
import { getCookie } from '@utils';
import { JSX, useContext, useMemo, type PropsWithChildren } from 'react';

import { AppSuspenseFallback } from '@components';
import { createContext } from 'react';

export interface IAccountProviderProps {
	children: JSX.Element;
}
export type IAccountContext = {
	account?: AccountDetailsDTO;
	isAuthenticated?: boolean;
	isLoadingAccount?: boolean;
	hasCheckedAccountOnce?: boolean;
	refetchAccount?: () => Promise<void>;
};

export const AccountContext = createContext<IAccountContext>({});

export function AccountProvider({ children }: PropsWithChildren) {
	const token = getCookie('accessToken');

	const {
		data: account,
		isLoading,
		isFetched,
		refetch,
	} = useQuery({ queryKey: ['account'], queryFn: getAccountDetails, enabled: !!token, retry: false });

	const value = useMemo<IAccountContext>(
		() => ({
			account,
			isAuthenticated: !!account?.id,
			isLoadingAccount: !!token && isLoading,
			hasCheckedAccountOnce: !token || isFetched,
			refetchAccount: async () => {
				await refetch();
			},
		}),
		[account, isLoading, isFetched, refetch, token]
	);

	if (token && isLoading) return <AppSuspenseFallback />;

	return <AccountContext.Provider value={value}>{children}</AccountContext.Provider>;
}

export function useAccount() {
	const context = useContext(AccountContext);
	if (!context) throw new Error('This hook must only be used inside AccountProvider');
	return context;
}
