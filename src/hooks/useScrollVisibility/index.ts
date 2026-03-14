import { useEffect, useState } from 'react';

export function useScrollVisibility() {
	const [isVisible, setIsVisible] = useState<boolean>(true);

	useEffect(() => {
		const html = document.getElementsByTagName('html')[0];

		html.style.overflow = isVisible ? 'unset' : 'hidden';
	}, [isVisible]);

	return {
		hide: () => setIsVisible(true),
		show: () => setIsVisible(false),
	};
}
