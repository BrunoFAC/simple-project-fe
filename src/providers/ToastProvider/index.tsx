import { SnackbarProvider } from 'notistack';
import { PropsWithChildren } from 'react';

export function ToastProvider({ children }: PropsWithChildren) {
	return (
		<SnackbarProvider anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }} style={{ boxShadow: 'none' }}>
			{children}
		</SnackbarProvider>
	);
}
