import clsx from 'clsx';
import { useState, useEffect } from 'react';

type Props = {
	notificationIcon: React.ReactNode;
	notificationName: string;
	notificationContent: string;
	showNotification: boolean;
	onClose?: () => void;
};

export const Notification = ({
	notificationIcon,
	notificationName,
	notificationContent,
	showNotification,
	onClose,
}: Props) => {
	const [visible, setVisible] = useState(false);
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setVisible(showNotification);
	}, [showNotification]);

	useEffect(() => {
		if (visible) {
			setIsMounted(true);
			const timer = setTimeout(() => {
				setVisible(false);
				onClose?.();
			}, 3000);

			return () => clearTimeout(timer);
		} else {
			const timer = setTimeout(() => {
				setIsMounted(false);
			}, 400);
			return () => clearTimeout(timer);
		}
	}, [visible, onClose]);

	if (!isMounted) return null;

	return (
		<div
			className={clsx(
				'w-full fixed top-5 z-50 transition-all duration-400 transform flex justify-center pl-5 pr-5',
				{
					'translate-y-0 opacity-100': visible,
					'-translate-y-full opacity-0': !visible,
				}
			)}
		>
			<div className='w-[425px] h-[100px] bg-[var(--post-bg)] rounded-lg flex items-center justify-between border border-[var(--line-color)] shadow-lg p-5 max-[456px]:flex-col max-[456px]:text-center max-[456px]:h-auto max-[456px]:p-2 max-[456px]:pb-5'>
				<div className='w-[20%] h-[100px] flex items-center justify-center'>
					{notificationIcon}
				</div>
				<div className='w-[80%] h-auto'>
					<h1 className='text-[18px] font-medium text-[var(--color)] -mt-1.5 max-[456px]:-mt-3.5'>
						{notificationName}
					</h1>
					<p className='text-[var(--footer-text-color)] text-[16px] mt-1'>
						{notificationContent}
					</p>
				</div>
			</div>
		</div>
	);
};
