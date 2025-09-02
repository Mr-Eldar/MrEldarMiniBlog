import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { deleteNotesById, getNotesForDelete } from '../services/notesbd';
import { Notification } from '../Components/Notification';
import type { Notes } from '../types/notes';

import {
	Trash2,
	Search,
	AlertTriangle,
	X,
	Check,
} from 'lucide-react';

export const DeleteNote = () => {
	const navigate = useNavigate();
	const [notes, setNotes] = React.useState<Notes[]>([]);
	const [showNotification, setShowNotification] = useState(false);
	const [notificationStatus, setNotificationStatus] = useState<
		'success' | 'error'
	>('success');
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedNote, setSelectedNote] = useState<number | null>(null);
	const [confirmationText, setConfirmationText] = useState('');
	const [isDeleting, setIsDeleting] = useState(false);

	const filteredNotes = notes.filter(note =>
		note.title.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const TimerGoToHome = () => {
		const timer = setTimeout(() => {
			navigate('/');
		}, 4000);
		return () => clearTimeout(timer);
	};

	React.useEffect(() => {
		const fetchNotes = async () => {
			try {
				const data = await getNotesForDelete();
				setNotes(data);
				setNotificationStatus('success');
			} catch (error) {
				setNotificationStatus('error');
			}
		};

		fetchNotes();
	}, []);

	const handleDelete = async () => {
		if (confirmationText !== 'УДАЛИТЬ') {
			alert('Пожалуйста, введите "УДАЛИТЬ" для подтверждения');
			return;
		}

		setIsDeleting(true);
		try {
			// Здесь будет логика удаления
			await deleteNotesById(selectedNote);
			setSelectedNote(null);
			setConfirmationText('');
			setNotificationStatus('success');
			TimerGoToHome();
		} catch (error) {
			setNotificationStatus('error');
			TimerGoToHome();
		} finally {
			setIsDeleting(false);
		}
	};

	return (
		<div className='h-auto mt-10 flex flex-col max-[321px]:mt-10'>
			{/* Уведомление */}
			{(notificationStatus === 'success' && showNotification && (
				<Notification
					notificationIcon={
						<Check className='w-[50px] h-[50px] text-[var(--color)]' />
					}
					notificationName='Успех. 😎'
					notificationContent='Заметка была успешно удалена.'
					showNotification={showNotification}
					onClose={() => setShowNotification(false)}
				/>
			)) || (
				<Notification
					notificationIcon={
						<X className='w-[50px] h-[50px] text-[var(--color)]' />
					}
					notificationName='Не удалось удалить заметку. 😓'
					notificationContent='Возможно передался неверный id заметки.'
					showNotification={showNotification}
					onClose={() => setShowNotification(false)}
				/>
			)}
			<div className=''>
				{/* Заголовок
				<div className='text-center mb-8'>
					<h1 className='text-3xl font-bold text-[var(--color)] mb-2'>
						Удаление постов
					</h1>
					<p className='text-[var(--footer-text-color)]'>
						Поиск и удаление опубликованных постов
					</p>
				</div> */}

				{/* Поиск */}
				<div className='bg-[var(--post-bg)] rounded-2xl p-6 mb-6 border border-[var(--line-color)]'>
					<div className='flex items-center gap-3 mb-4'>
						<Search className='w-5 h-5 text-[var(--footer-text-color)]' />
						<h2 className='text-xl font-semibold text-[var(--color)]'>
							Поиск заметок
						</h2>
					</div>

					<input
						type='text'
						placeholder='Введите название заметки...'
						value={searchTerm}
						onChange={e => setSearchTerm(e.target.value)}
						className='w-full px-4 py-3 border border-[var(--line-color)] bg-[var(--bg)] text-[var(--color)] rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent'
					/>
				</div>

				{/* Список постов */}
				<div className='bg-[var(--post-bg)] rounded-2xl p-6 mb-6 border border-[var(--line-color)]'>
					<h2 className='text-xl font-semibold text-[var(--color)] mb-4'>
						Найденные заметки ({filteredNotes.length})
					</h2>

					<div className='space-y-3'>
						{filteredNotes.map(post => (
							<div
								key={post.id}
								className={`p-4 rounded-lg border cursor-pointer transition-all ${
									selectedNote === post.id
										? 'border-red-500 bg-red-50 dark:bg-red-950/20'
										: 'border-[var(--line-color)] hover:border-red-300'
								}`}
								onClick={() => setSelectedNote(post.id)}
							>
								<div className='flex items-center justify-between'>
									<div>
										<h3 className='font-medium text-[var(--color)]'>
											{post.title}
										</h3>
										<p className='text-sm text-[var(--footer-text-color)]'>
											Опубликован:{' '}
											{new Date(post.createdAt).toLocaleDateString('ru-RU')}
										</p>
									</div>
									{selectedNote === post.id && (
										<div className='w-3 h-3 bg-red-500 rounded-full'></div>
									)}
								</div>
							</div>
						))}
					</div>

					{/* Пустое состояние */}
					{!selectedNote && filteredNotes.length === 0 && searchTerm && (
						<div className='text-center py-12'>
							<Search className='w-12 h-12 text-[var(--footer-text-color)] mx-auto mb-4' />
							<p className='text-[var(--footer-text-color)] text-balance'>
								Заметки не найдены. Попробуйте другой запрос.
							</p>
						</div>
					)}

					{/* Отстутствие постов */}
					{filteredNotes.length === 0 && searchTerm === '' && (
						<div className='text-center py-12'>
							<div className='animate-spin inline-block w-10 h-10 border-[3px] border-current border-t-transparent text-[var(--footer-text-color)] rounded-full'></div>
						</div>
					)}
				</div>

				{/* Зона удаления */}
				{selectedNote && (
					<div className='bg-red-50 dark:bg-red-950/20 rounded-2xl p-6 border border-red-200 dark:border-red-800'>
						<div className='flex items-center gap-3 mb-4'>
							<AlertTriangle className='w-6 h-6 text-red-600' />
							<h2 className='text-xl font-semibold text-[var(--color)]'>
								Подтверждение удаления
							</h2>
						</div>

						<div className='bg-white dark:bg-red-900/30 p-4 rounded-lg mb-4'>
							<p className='text-red-600 font-medium mb-2'>
								⚠️ Вы собираетесь удалить заметку:
							</p>
							<p className='text-[var(--color)] font-semibold'>
								{notes.find(note => note.id === selectedNote)?.title}
							</p>
							<p className='text-sm text-[var(--footer-text-color)] mt-2'>
								Это действие нельзя отменить. Все данные будут безвозвратно
								удалены.
							</p>
						</div>

						<div className='space-y-4'>
							<div>
								<label className='block text-sm font-medium text-[var(--color)] mb-2'>
									Для подтверждения введите{' '}
									<span className='text-red-600 font-mono'>УДАЛИТЬ</span>
								</label>
								<input
									type='text'
									value={confirmationText}
									onChange={e => setConfirmationText(e.target.value)}
									placeholder='УДАЛИТЬ'
									className='w-full px-4 py-3 border border-red-300 bg-white text-[var(--footer-text-color)] rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent font-mono'
								/>
							</div>

							<div className='flex flex-wrap gap-3'>
								<button
									onClick={() => {
										setSelectedNote(null);
										setConfirmationText('');
									}}
									className='flex-1 px-6 py-3 border border-[var(--line-color)] text-[var(--color)] bg-[var(--post-bg)] rounded-lg hover:bg-[var(--hover-bg)] transition-colors'
								>
									Отмена
								</button>

								<button
									onClick={handleDelete}
									disabled={confirmationText !== 'УДАЛИТЬ' || isDeleting}
									className='flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2'
								>
									{isDeleting ? (
										<>
											<div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin' />
											Удаление...
										</>
									) : (
										<>
											<Trash2 className='w-4 h-4' />
											Удалить навсегда
										</>
									)}
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};