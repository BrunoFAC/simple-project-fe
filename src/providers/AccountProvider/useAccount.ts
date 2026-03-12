import { useContext } from 'react';
import { AccountContext } from './Provider';

export function useAccount() {
	const context = useContext(AccountContext);

	if (!context) {
		throw new Error('This hook must only be used inside AccountProvider');
	}

	return context;
}
