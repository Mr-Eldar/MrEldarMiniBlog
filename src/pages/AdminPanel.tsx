import React from 'react'
import clsx from 'clsx';

import { Shield } from 'lucide-react';
import { DeletePost } from './DeletePost';
import { DeleteNote } from './DeleteNote';
import { CreatePost } from './CreatePost';
import { CreateNote } from './CreateNote';

enum Pages {
   DELETEPOST = 'DeletePostPage',
   DELETENOTE = 'DeleteNotePage',
   CREATEPOST = 'CreatePostPage',
   CREATENOTE = 'CreateNotePage'
}

export const AdminPanel = () => {
   const [page, setPage] = React.useState<Pages>(Pages.CREATEPOST)
	return (
		<div className='container w-auto h-auto pt-15 transition-colors'>
			{/* Информация о начале */}
			<div className='text-center mb-8'>
				<div className='inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4'>
					<Shield className='w-8 h-8 text-red-600' />
				</div>
				<h1 className='text-3xl font-bold text-[var(--color)] mb-2'>
					Управление постами
				</h1>
				<p className='text-[var(--footer-text-color)]'>
					Удаление, создание постов, заметок, все здесь.
				</p>
			</div>

			<div className='w-auto h-auto'>
				<div className='flex flex-wrap items-center justify-center gap-5'>
					<button
						type='button'
						onClick={() => setPage(Pages.DELETEPOST)}
						className={clsx(
							'text-red-600 border border-red-600 px-5 py-3 rounded-[10px] cursor-pointer flex items-center justify-center transition-colors hover:bg-red-600 hover:text-white',
							{
								'bg-red-600 text-white': page === Pages.DELETEPOST,
							}
						)}
					>
						Удаление постов
					</button>
					<button
						type='button'
						onClick={() => setPage(Pages.DELETENOTE)}
						className={clsx(
							'text-amber-400 border border-amber-400 px-5 py-3 rounded-[10px] cursor-pointer flex items-center justify-center transition-colors hover:bg-amber-400 hover:text-white',
							{
								'bg-amber-400 text-white': page === Pages.DELETENOTE,
							}
						)}
					>
						Удаление заметок
					</button>
					<button
						type='button'
						onClick={() => setPage(Pages.CREATEPOST)}
						className={clsx(
							'text-emerald-500 border border-emerald-500 px-5 py-3 rounded-[10px] cursor-pointer flex items-center justify-center transition-colors hover:bg-emerald-500 hover:text-white',
							{
								'bg-emerald-500 text-white': page === Pages.CREATEPOST,
							}
						)}
					>
						Создание постов
					</button>
					<button
						type='button'
						onClick={() => setPage(Pages.CREATENOTE)}
						className={clsx(
							'text-amber-300 border border-amber-300 px-5 py-3 rounded-[10px] cursor-pointer flex items-center justify-center transition-colors hover:bg-amber-300 hover:text-white',
							{
								'bg-amber-300 text-white': page === Pages.CREATENOTE,
							}
						)}
					>
						Создание заметок
					</button>
				</div>
			</div>

			<div className='w-full h-auto'>
				{(page === Pages.DELETEPOST && <DeletePost />) ||
					(page === Pages.DELETENOTE && <DeleteNote />) ||
					(page === Pages.CREATENOTE && <CreateNote />) ||
					(page === Pages.CREATEPOST && <CreatePost />)}
			</div>
		</div>
	);
};
