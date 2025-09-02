import React, { useEffect, useState } from 'react';

interface FadeInProps {
	children: React.ReactNode;
	delay?: number;
	className?: string;
}

export const FadeIn: React.FC<FadeInProps> = ({
	children,
	delay = 0,
	className = '',
}) => {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsVisible(true);
		}, delay);

		return () => clearTimeout(timer);
	}, [delay]);

	return (
		<div
			className={`transition-all duration-700 ease-out ${
				isVisible
					? 'opacity-100 transform translate-y-0'
					: 'opacity-0 transform translate-y-8'
			} ${className}`}
		>
			{children}
		</div>
	);
};
