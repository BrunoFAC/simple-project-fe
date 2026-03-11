import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { mapAxiosError, toast } from '@utils';
import { type PropsWithChildren } from 'react';

const queryClient = new QueryClient({
	queryCache: new QueryCache({
		onError: (error, query) => {
			const silent = query.meta?.silentErrorToast;
			if (silent) return;

			toast({ message: mapAxiosError(error), variant: 'error' });
		},
	}),
	mutationCache: new MutationCache({
		onError: (error, _variables, _context, mutation) => {
			const silent = mutation.meta?.silentErrorToast;
			if (silent) return;

			toast({ message: mapAxiosError(error), variant: 'error' });
		},
	}),
	defaultOptions: { queries: { retry: 1, refetchOnWindowFocus: false } },
});

export const ReactQueryProvider = ({ children }: PropsWithChildren) => {
	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
