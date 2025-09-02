import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { FilterCategoriesContext } from '../App';
import { Notification } from '../Components/Notification';
import { formatText } from '../utils/formatter';

import type { Post } from '../types/post';

import { Check, X } from 'lucide-react';

export const CreateNote = () => {
	const { filterCategories } = useContext(FilterCategoriesContext);
	const [title, setTitle] = useState('');
	const [miniDescription, setMiniDescription] = useState('');
	const [fullDescription, setFullDescription] = useState('');
   const [postCategory, setPostCategory] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [showPreview, setShowPreview] = useState(false);
	const [showNotification, setShowNotification] = useState(false);
	const [notificationStatus, setNotificationStatus] = useState<
		'success' | 'error'
	>('success');
	const navigate = useNavigate();

	const TimerGoToHome = () => {
		const timer = setTimeout(() => {
			navigate('/');
		}, 4000);
		return () => clearTimeout(timer);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			if (
				title.length === 0 ||
				miniDescription.length === 0 ||
				fullDescription.length === 0
			) {
				alert('Заполните все поля');
				return;
			}

			await axios.post<Post>(
				'https://68acc47fb996fea1c08ad7b2.mockapi.io/notes',
				{
					title,
					miniDescription,
					fullDescription,
               postCategory: postCategory || 'general',
					createdAt: new Date().toISOString(),
				}
			);

			setNotificationStatus('success');
			setShowNotification(true);
			TimerGoToHome();
		} catch (error) {
			setNotificationStatus('error');
			setShowNotification(true);
			TimerGoToHome();
		} finally {
			setIsLoading(false);
		}
	};

	const formatButtons = [
		{ symbol: '**B**', tooltip: 'Жирный текст', insert: '**текст**' },
		{ symbol: '*I*', tooltip: 'Курсив', insert: '*текст*' },
		{ symbol: '[L]', tooltip: 'Ссылка', insert: '[текст](url)' },
		{ symbol: '![Img]', tooltip: 'Изображение', insert: '!(описание)(url)' },
		{ symbol: 'H1', tooltip: 'Заголовок 1', insert: '# Заголовок' },
		{ symbol: 'H2', tooltip: 'Заголовок 2', insert: '## Заголовок' },
		{ symbol: 'H3', tooltip: 'Заголовок 3', insert: '### Заголовок' },
		{ symbol: '•', tooltip: 'Список', insert: '- пункт' },
		{ symbol: '>', tooltip: 'Цитата', insert: '> цитата' },
		{ symbol: '---', tooltip: 'Разделитель', insert: '---' },
		{ symbol: '[!]', tooltip: 'Бейдж', insert: '{!метка}' },
		{ symbol: '</>', tooltip: 'Код', insert: '```код```' },
	];

	const insertFormat = (text: string) => {
		setFullDescription(prev => prev + text + '\n');
	};

	return (
		<div className='w-full h-auto pt-10 transition-colors'>
			{/* Уведомление */}
			{(notificationStatus === 'success' && showNotification && (
				<Notification
					notificationIcon={
						<Check className='w-[50px] h-[50px] text-[var(--color)]' />
					}
					notificationName='Пост успешно создан! 🎉'
					notificationContent='Пост был успешно добавлен в бд.'
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
						notificationContent='Пост не был добавлен в бд.'
						showNotification={showNotification}
						onClose={() => setShowNotification(false)}
					/>
				))}

			<div className='max-w-6xl mx-auto'>
				{/* Заголовок */}
				{/* <div className='text-center mb-8'>
					<h1 className='text-3xl font-bold text-[var(--color)] mb-2 max-[375px]:text-[28px]'>
						Создать новый пост
					</h1>
					<p className='text-[var(--footer-text-color)] text-balance'>
						Поделитесь своими мыслями с миром
					</p>
				</div> */}

				{/* Переключение между редактором и предпросмотром */}
				<div className='flex flex-wrap gap-2 mb-4 justify-center'>
					<button
						type='button'
						onClick={() => setShowPreview(false)}
						className={`px-4 py-2 rounded-lg border transition-colors ${
							!showPreview
								? 'bg-[var(--btn-bg)] text-[var(--btn-color)] border-[var(--line-color)]'
								: 'bg-[var(--post-bg)] text-[var(--color)] border-[var(--line-color)] hover:bg-[var(--hover-bg)]'
						}`}
					>
						📝 Редактор
					</button>
					<button
						type='button'
						onClick={() => setShowPreview(true)}
						className={`px-4 py-2 rounded-lg border transition-colors ${
							showPreview
								? 'bg-[var(--btn-bg)] text-[var(--btn-color)] border-[var(--line-color)]'
								: 'bg-[var(--post-bg)] text-[var(--color)] border-[var(--line-color)] hover:bg-[var(--hover-bg)]'
						}`}
					>
						👁️ Предпросмотр
					</button>
				</div>

				{!showPreview ? (
					/* РЕДАКТОР */
					<form
						onSubmit={handleSubmit}
						className='bg-[var(--post-bg)] rounded-2xl shadow-lg p-6 border border-[var(--line-color)]'
					>
						{/* Поле заголовка */}
						<div className='mb-6'>
							<label className='block text-sm font-medium text-[var(--color)] mb-2'>
								Заголовок заметки *
							</label>
							<input
								type='text'
								value={title}
								onChange={e => setTitle(e.target.value)}
								placeholder='Введите заголовок...'
								className='w-full px-4 py-3 border border-[var(--line-color)] bg-[var(--bg)] text-[var(--color)] rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg placeholder-[var(--footer-text-color)]'
								required
							/>
						</div>

						{/* Поле мини описания */}
						<div className='mb-6'>
							<label className='block text-sm font-medium text-[var(--color)] mb-2'>
								Мини описание заметки *
							</label>
							<input
								type='text'
								value={miniDescription}
								onChange={e => setMiniDescription(e.target.value)}
								placeholder='Введите мини описание...'
								className='w-full px-4 py-3 border border-[var(--line-color)] bg-[var(--bg)] text-[var(--color)] rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg placeholder-[var(--footer-text-color)]'
								required
							/>
						</div>

						{/* Поле категории */}
						<div className='mb-6'>
							<label className='block text-sm font-medium text-[var(--color)] mb-2'>
								Категория
							</label>
							<select
								value={postCategory}
								onChange={e => setPostCategory(e.target.value)}
								className='w-full px-4 py-3 border border-[var(--line-color)] bg-[var(--bg)] text-[var(--color)] rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							>
								<option value=''>Выберите категорию</option>
								{filterCategories.map(category => (
									<option key={category?.id} value={category?.id}>
										{category?.name}
									</option>
								))}
							</select>
						</div>

						{/* Панель форматирования */}
						<div className='mb-4'>
							<label className='block text-sm font-medium text-[var(--color)] mb-2'>
								Текст заметки *
							</label>

							<div className='flex flex-wrap gap-2 mb-3 p-3 bg-[var(--bg)] rounded-lg border border-[var(--line-color)]'>
								{formatButtons.map((btn, index) => (
									<button
										key={index}
										type='button'
										onClick={() => insertFormat(btn.insert)}
										title={btn.tooltip}
										className='px-3 py-2 bg-[var(--post-bg)] border border-[var(--line-color)] text-[var(--color)] rounded-md text-sm hover:bg-[var(--hover-bg)] transition-colors'
									>
										{btn.symbol}
									</button>
								))}
							</div>

							<textarea
								value={fullDescription}
								onChange={e => setFullDescription(e.target.value)}
								placeholder='Напишите вашу заметку здесь... Используйте кнопки выше для форматирования'
								className='w-full px-4 py-3 border border-[var(--line-color)] bg-[var(--bg)] text-[var(--color)] rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[300px] font-mono text-sm placeholder-[var(--footer-text-color)]'
								required
							/>
						</div>

						{/* Кнопки действий */}
						<div className='flex flex-wrap gap-4 pt-4 border-t border-[var(--line-color)] max-[597px]:justify-center'>
							<button
								type='button'
								onClick={() => navigate('/')}
								className='px-6 py-3 border border-[var(--line-color)] text-[var(--color)] bg-[var(--post-bg)] rounded-lg hover:bg-[var(--hover-bg)] transition-colors'
							>
								Отмена
							</button>

							<button
								type='button'
								onClick={() => setShowPreview(true)}
								className='px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors'
							>
								Предпросмотр
							</button>

							<button
								type='submit'
								disabled={isLoading}
								className='px-6 py-3 bg-[var(--btn-bg)] text-[var(--btn-color)] rounded-lg hover:bg-[var(--btn-hover-bg)] hover:text-[var(--color)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2 border border-[var(--line-color)]'
							>
								{isLoading ? (
									<>
										<div className='w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin' />
										Публикация...
									</>
								) : (
									'Опубликовать заметку'
								)}
							</button>
						</div>
					</form>
				) : (
					/* ПРЕДПРОСМОТР */
					<div className='bg-[var(--post-bg)] rounded-2xl shadow-lg p-6 border border-[var(--line-color)]'>
						<div className='flex justify-between items-center mb-6 max-[610px]:flex-wrap max-[610px]:justify-center max-[610px]:gap-4'>
							<h2 className='text-2xl font-bold text-[var(--color)] max-[340px]:text-center'>
								Предпросмотр заметки
							</h2>
							<button
								onClick={() => setShowPreview(false)}
								className='px-4 py-2 bg-[var(--btn-bg)] text-[var(--btn-color)] rounded-lg hover:bg-[var(--btn-hover-bg)] hover:text-[var(--color)] transition-colors border border-[var(--line-color)]'
							>
								Вернуться к редактированию
							</button>
						</div>

						{/* Предпросмотр контента */}
						<div className='bg-[var(--bg)] rounded-lg p-6 border border-[var(--line-color)] min-h-[400px]'>
							{title ? (
								<h1 className='text-4xl font-bold text-[var(--color)] mb-4'>
									{title}
								</h1>
							) : (
								<p className='text-[var(--footer-text-color)] italic'>
									Нет заголовка
								</p>
							)}

							{fullDescription ? (
								<div
									className='pt-10 text-[var(--color)] text-[19px] font-medium break-words max-[580px]:text-[16px] relative'
									dangerouslySetInnerHTML={{
										__html: formatText(fullDescription),
									}}
								/>
							) : (
								<p className='text-[var(--footer-text-color)] italic'>
									Нет содержимого
								</p>
							)}
						</div>

						{/* Кнопки действий в предпросмотре */}
						<div className='flex flex-wrap gap-4 pt-6 border-t border-[var(--line-color)] mt-6 max-[475px]:justify-center'>
							<button
								onClick={() => setShowPreview(false)}
								className='px-6 py-3 border border-[var(--line-color)] text-[var(--color)] bg-[var(--post-bg)] rounded-lg hover:bg-[var(--hover-bg)] transition-colors'
							>
								Редактировать
							</button>

							<button
								onClick={handleSubmit}
								disabled={isLoading}
								className='px-6 py-3 bg-[var(--btn-bg)] text-[var(--btn-color)] rounded-lg hover:bg-[var(--btn-hover-bg)] hover:text-[var(--color)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2 border border-[var(--line-color)]'
							>
								{isLoading ? (
									<>
										<div className='w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin' />
										Публикация...
									</>
								) : (
									'Опубликовать заметку'
								)}
							</button>
						</div>
					</div>
				)}

				{/* Подсказки по форматированию (только в режиме редактора) */}
				{!showPreview && (
					<div className='mt-8 bg-[var(--post-bg)] rounded-lg p-6 border border-[var(--line-color)]'>
						<h3 className='font-semibold text-[var(--color)] mb-3'>
							📝 Подсказки по форматированию:
						</h3>
						<div className='text-sm text-[var(--footer-text-color)] space-y-1'>
							<p>
								**жирный** →{' '}
								<strong className='text-[var(--color)]'>жирный</strong>
							</p>
							<p>
								*курсив* → <em className='text-[var(--color)]'>курсив</em>
							</p>
							<p>
								[текст](url) →{' '}
								<span className='text-blue-400 underline'>текст</span>
							</p>
							<p>!(описание)(url) → изображение</p>
							<p># Заголовок → большой заголовок</p>
							<p>## Заголовок → средний заголовок</p>
							<p>### Заголовок → маленький заголовок</p>
							<p>- пункт → маркированный пункт списка</p>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};
