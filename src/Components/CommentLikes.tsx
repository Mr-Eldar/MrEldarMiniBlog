import React from 'react'

import { Heart } from 'lucide-react';
import { clickLike } from '../services/comments';
import clsx from 'clsx';

type Props = {
   likes: number;
   isLiked: boolean;
   commentId: number
};

export const CommentLikes = ({ likes, isLiked, commentId }: Props) => {
   const [commentLikes, setCommentLikes] = React.useState<number>(likes);
   const [isLiking, setIsLiking] = React.useState<boolean>(isLiked); 

   const handleClick = async () => {
      setIsLiking(true)
      const currentLikes = commentLikes;

      setCommentLikes(currentLikes + 1);

      try {
         const updatedComment = await clickLike(commentId, currentLikes, isLiking);
         setCommentLikes(updatedComment.likes);
         setIsLiking(true);
      } catch (error) {
         console.error('Ошибка лайка:', error);
         setCommentLikes(currentLikes);
         setIsLiking(false);
      }
   }

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
