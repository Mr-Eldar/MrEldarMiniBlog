import React from 'react'
import type { Comment } from '../types/comment';

import { NotPosts } from '../pages/NotPosts';
import { createComment, getCommentsById } from '../services/comments';
import { Notification } from '../Components/Notification';

import { Check, X, ChevronDown } from 'lucide-react';
import { CommentLikes } from './CommentLikes';
import clsx from 'clsx';

type Props = {
	postId: number | any
}

export const Comments = ({ postId }: Props) => {
   const [comments, setComments] = React.useState<Comment[]>([])
   const [name, setName] = React.useState<string>('')
   const [comment, setComment] = React.useState<string>('')
	const [showCreateComment, setShowCreateComment] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(false);
	const [showNotification, setShowNotification] = React.useState(false);
	const [notificationStatus, setNotificationStatus] = React.useState<
		'success' | 'error'
	>('success');


	const createCommentFunc = () => {
		setIsLoading(true)
		try {
			if (name.length === 0 && comment.length === 0) {
				alert('Заполните все поля');
				return
			}

			createComment({
				userName: name,
				postId: Number(postId),
				commentContent: comment,
				likes: 0,
			})
			setNotificationStatus("success")
			setShowNotification(true);
			setName("")
			setComment("")
			setIsLoading(false)
		} catch (error) {
			setNotificationStatus('error');
			setShowNotification(true);
			setName('');
			setComment('');
		} finally {
			setIsLoading(false);
		}
	}

	React.useEffect(() => {
		const fetchCommetns = async () => {
			try {
				const data = await getCommentsById(+postId)
				setComments(data)
			} catch (error) {
				console.log(error)
			}
		}

		fetchCommetns()
	}, [])

	return (
		<div className='w-full h-auto pt-15'>
			{/* Уведомление */}
			{(notificationStatus === 'success' && showNotification && (
				<Notification
					notificationIcon={
						<Check className='w-[50px] h-[50px] text-[var(--color)]' />
					}
					notificationName='Комментарий успешно создан! 🎉'
					notificationContent='Комментарий был успешно добавлен в бд.'
					showNotification={showNotification}
					onClose={() => setShowNotification(false)}
				/>
			)) ||
				(notificationStatus === 'error' && showNotification && (
					<Notification
						notificationIcon={
							<X className='w-[50px] h-[50px] text-[var(--color)]' />
						}
						notificationName='Что-то пошло не так! 🤕'
						notificationContent='Комментарий не был добавлен в бд.'
						showNotification={showNotification}
						onClose={() => setShowNotification(false)}
					/>
				))}

			{/* Создание комментария */}
			<div>
				<div
					onClick={() => setShowCreateComment(!showCreateComment)}
					className='flex items-center justify-between'
				>
					<h1 className='text-4xl font-black text-[var(--color)] mb-10 max-[580px]:text-[26px]'>
						Написать комментарий
					</h1>
					<ChevronDown
						className={clsx(
							'text-[var(--color)] scale-110 cursor-pointer mb-10 transition-transform rotate-0',
							{ 'rotate-180': showCreateComment }
						)}
					/>
				</div>
				<div
					className={clsx('transition-all opacity-0 h-0', {
						'opacity-100 h-auto': showCreateComment,
					})}
				>
					<div>
						{/* Поле имени */}
						<div className='mb-6'>
							<label className='block text-sm font-medium text-[var(--color)] mb-2'>
								Введите ваше имя *
							</label>
							<input
								type='text'
								value={name}
								onChange={e => setName(e.target.value)}
								placeholder='Введите имя от которого будете писать комментарий...'
								className='w-full px-4 py-3 border border-[var(--line-color)] bg-[var(--bg)] text-[16px] text-[var(--color)] rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg placeholder-[var(--footer-text-color)]'
								required
							/>
						</div>
					</div>

					{/* Панель создания */}
					<div className='mb-4'>
						<label className='block text-sm font-medium text-[var(--color)] mb-2'>
							Текст комментария *
						</label>

						<textarea
							value={comment}
							onChange={e => setComment(e.target.value)}
							placeholder='Напишите ваш комментарий здесь...'
							className='w-full px-4 py-3 border border-[var(--line-color)] bg-[var(--bg)] text-[var(--color)] rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[200px] font-mono text-sm placeholder-[var(--footer-text-color)]'
							required
						/>

						<div>
							<button
								onClick={createCommentFunc}
								type='button'
								className='w-full px-4 py-3 mt-5 cursor-pointer bg-[var(--color)] rounded-lg font-semibold text-[18px] text-[var(--bg)] transition-colors hover:bg-[var(--post-bg)] hover:text-[var(--color)]'
							>
								{isLoading ? (
									<div className='flex items-center justify-center gap-3'>
										<div className='w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin' />
										Публикация...
									</div>
								) : (
									'Опубликовать комментарий'
								)}
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* Просмотр комментариев */}
			<div className='mt-10 relative w-full'>
				<h1 className='text-4xl font-black text-[var(--color)] mb-10 max-[580px]:text-[26px]'>
					Комментарии
				</h1>
				<div className='flex flex-col items-center justify-center gap-7'>
					{(comments.length === 0 && (
						<NotPosts
							notPostName='Нет комментариев.'
							notPostDescription='Комментариев пока что нет'
						/>
					)) || (
						<>
							{comments.map(comment => (
								<div
									key={comment.id}
									className='w-full h-auto rounded-2xl p-10 pt-7 shadow-md bg-[var(--post-bg)]'
								>
									<div className='flex items-center justify-between'>
										<h3 className='font-semibold text-[18px] text-green-400'>
											{comment.userName.length > 1 ? comment.userName : 'Аноним'}
										</h3>
										<CommentLikes
											commentId={comment.postId}
											likes={comment.likes}
										/>
									</div>
									<p className='font-medium text-[18px] text-[var(--color)] mt-5'>
										{comment.commentContent}
									</p>
								</div>
							))}
						</>
					)}
				</div>
			</div>
		</div>
	);
};