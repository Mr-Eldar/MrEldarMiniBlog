import React from 'react'

import { Heart } from 'lucide-react';
import { clickLike } from '../services/comments';
import clsx from 'clsx';

type Props = {
   likes: number;
   commentId: number
};

export const CommentLikes = ({ likes, commentId }: Props) => {
   const [commentLikes, setCommentLikes] = React.useState<number>(likes);
   const [isLiking, setIsLiking] = React.useState<boolean>(false);

	// Проверяем в localStorage, лайкал ли пользователь этот комментарий
	React.useEffect(() => {
		const likedComments = JSON.parse(
			localStorage.getItem('likedComments') || '{}'
		);
		setIsLiking(!!likedComments[commentId]);
	}, [commentId]);

	const handleClick = async () => {
		if (isLiking) return; // Не даем лайкать повторно

		const currentLikes = commentLikes;
		setCommentLikes(currentLikes + 1);
		setIsLiking(true);

		// Сохраняем в localStorage
		const likedComments = JSON.parse(
			localStorage.getItem('likedComments') || '{}'
		);
		likedComments[commentId] = true;
		localStorage.setItem('likedComments', JSON.stringify(likedComments));

		try {
			const updatedComment = await clickLike(commentId, currentLikes + 1);
			setCommentLikes(updatedComment.likes);
		} catch (error) {
			console.error('Ошибка лайка:', error);
			setCommentLikes(currentLikes);
			setIsLiking(false);

			// Удаляем из localStorage при ошибке
			const likedComments = JSON.parse(
				localStorage.getItem('likedComments') || '{}'
			);
			delete likedComments[commentId];
			localStorage.setItem('likedComments', JSON.stringify(likedComments));
		}
	};

	return (
		<>
			<div className='flex flex-row-reverse items-center'>
				<button onClick={handleClick} disabled={isLiking}>
					<Heart
						className={clsx(
							'text-[var(--footer-text-color)] cursor-pointer transition-all hover:text-red-600',
							{
								'text-red-600': isLiking,
							}
						)}
					/>
				</button>
				<span className='font-medium text-[var(--footer-text-color)] text-[18px] mr-2'>
					{commentLikes}
				</span>
			</div>
		</>
	);
};
