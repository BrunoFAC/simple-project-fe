import { RootProvider } from '@providers';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<RootProvider />
	</StrictMode>
);
