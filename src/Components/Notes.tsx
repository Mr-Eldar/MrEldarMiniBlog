import React from 'react'
import { Link } from 'react-router-dom';

import { getCountNotes, getNotes } from '../services/notesbd';
import { Notification } from './Notification';

import type { Notes } from '../types/notes'

import { FilterCategoriesContext } from '../App';
import { NotesSekeleton } from './Skeletons/NotesSkeleton';
import { FadeIn } from './FadeIn';
import { Shield, X } from 'lucide-react';
import { Pagination } from './Pagination';

export const NotesCard = () => {
	const { filterCategories } = React.useContext(FilterCategoriesContext);
   const [notes, setNotes] = React.useState<Notes[]>([]) 
   const [page, setPage] = React.useState(0);
   const [pageCount, setPageCount] = React.useState(0);
	const [writePassword, setWritePassword] = React.useState<true | false>(true)
	const [password, setPassword] = React.useState<string>('')
   const [loading, setLoading] = React.useState(true)
   const [showNotification, setShowNotification] = React.useState(false)

   const skeleton = [...Array(6)].map((_, i) => <NotesSekeleton key={i} />);
   const limit = 8;

	const checkPassword = (value: string) => {
		if (value == "E02072010G") {
			setWritePassword(false);
			setPassword('');
		} else {
			alert('Пароль не верный.');
			setPassword('');
		}
	}

   React.useEffect(() => {
      const fetchNotes = async () => {
         try {
            const data = await getNotes(page + 1, limit)
            setNotes(data)
         } catch (error) {
            setShowNotification(true);
         } finally {
            setLoading(false);
         }
      }

      fetchNotes()
   }, [page])

   // Подсчет общего количества постов
      React.useEffect(() => {
         const fetchCount = async () => {
            try {
               const total = await getCountNotes();
               setPageCount(Math.ceil(total / limit));
            } catch (error) {
               console.log('Ошибка подсчета постов' + error);
            }
         };
   
         fetchCount();
      }, []);

	return (
		<div className='w-full h-auto pt-15'>
			{/* Уведомление */}
			{showNotification && (
				<Notification
					showNotification={showNotification}
					onClose={() => setShowNotification(true)}
					notificationIcon={
						<X className='w-[50px] h-[50px] ml-5 text-[var(--color)]' />
					}
					notificationName='Произошла ошибка 😓'
					notificationContent='Попробуйте перезагрузить страницу.'
				/>
			)}

			{/* Контент */}
			<div className='container'>
				{loading ? (
					<div className='grid grid-cols-2 gap-7 max-[850px]:grid-cols-1 max-[850px]:gap-5'>
						{skeleton}
					</div>
				) : (
					writePassword === false && (
						<FadeIn delay={100}>
							<div className='grid grid-cols-2 gap-7 shadow-[var(--shadow)] max-[850px]:grid-cols-1 max-[850px]:gap-5'>
								{notes.map(note => (
									<Link to={`/note/${note.id}`}>
										<div
											key={note.id}
											className='w-auto h-45 rounded-xl transition-[400ms,ease] bg-[var(--post-bg)] p-13 pt-7 hover:-translate-y-2 hover:shadow-xl max-md:whitespace-nowrap max-md:overflow-hidden max-md:text-ellipsis'
										>
											<h1 className='text-3xl font-bold text-[var(--color)]'>
												{note.title}
											</h1>
											<p className='font-medium text-[18px] text-[var(--color)] pt-3'>
												{note.miniDescription}
											</p>
											<div className='flex items-center gap-3 mt-4'>
												<div
													className='w-2 h-2 rounded-full'
													style={{
														backgroundColor:
															filterCategories[note.postCategory - 1]
																?.category_color,
													}}
												></div>
												<h4 className='font-medium text-[18px] text-[var(--color)]'>
													{filterCategories[note.postCategory - 1]?.name}
												</h4>
											</div>
										</div>
									</Link>
								))}
							</div>
						</FadeIn>
					)
				)}

				{writePassword && !loading && notes.length !== 0 && (
					<div className='w-full h-screen pt-15 flex flex-col items-center'>
						<div className='text-center mb-8 max-w-3xl'>
							<div className='inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4'>
								<Shield className='w-8 h-8 text-emerald-600' />
							</div>
							<h1 className='text-3xl font-bold text-[var(--color)] mb-2'>
								Чтобы пройти дальше нужен код доступа.
							</h1>
							<p className='text-[var(--footer-text-color)]'>
								Введите пароль чтобы посмотреть личные заметки <b>MrEldar</b>.
							</p>
						</div>
						<div className='w-full max-w-3xl'>
							<div>
								<label className='block text-left text-sm font-medium text-[var(--color)] mb-2'>
									Для подтверждения введите{' '}
									<span className='text-emerald-600 font-bold'>Пароль</span>
								</label>
								<div className='flex items-center relative'>
									<input
										type='password'
										value={password}
										onChange={e => setPassword(e.target.value)}
										placeholder='Введите пароль.'
										className='w-full px-4 py-3 border border-emerald-300 bg-white text-[var(--footer-text-color)] rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent font-mono'
									/>
									{password && (
										<X
											onClick={() => setPassword('')}
											className='w-5 h-5 absolute right-3 cursor-pointer'
										/>
									)}
								</div>
							</div>
							<div className='mt-5'>
								<button
									onClick={() => checkPassword(password)}
									className='w-full px-4 py-3 bg-emerald-400 text-white rounded-lg font-bold text-[18px] cursor-pointer transition-all hover:bg-emerald-500 active:scale-95'
								>
									Отправить
								</button>
							</div>
						</div>
					</div>
				)}

				{pageCount > 1 && (
					<Pagination pageCount={pageCount} onPageChange={setPage} />
				)}
			</div>
		</div>
	);
};