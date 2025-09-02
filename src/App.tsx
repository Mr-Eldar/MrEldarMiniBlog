import axios from 'axios'
import React, { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

import { Header } from './Components/Header'
import { Footer } from './Components/Footer'
import { Notification } from './Components/Notification'
import { NotesCard } from './Components/Notes'

import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'
import { PostFullInfo } from './pages/Post'
import { AdminPanel } from './pages/AdminPanel'
import { NoteFullInfo } from './pages/Note'

import { useTheme } from '../src/hooks/useTheme'
import type { FilterCategories } from '../src/types/post'

import { X } from 'lucide-react'
import './index.css'

type FilterCategoriesContextType = {
	filterCategories: FilterCategories[];
};

export const FilterCategoriesContext =
	React.createContext<FilterCategoriesContextType>({
		filterCategories: [],
	});

export const App = () => {
	const navigate = useNavigate();

	const { theme, setTheme } = useTheme();
	const [filterCategories, setFilterCategories] = React.useState<
		FilterCategories[]
	>([]);
	const [showNotification, setShowNotification] = useState(false);

	
	React.useEffect(() => {
		const fetchFiltersCategories = async () => {
			try {
				const res = await axios.get(
					'https://689c747b58a27b18087e3e72.mockapi.io/Categories'
				);

				setFilterCategories(res.data);
			} catch (error) {
				setShowNotification(true);

				const timer = setTimeout(() => {
					navigate('/');
				}, 4000);

				return () => clearTimeout(timer);
			}
		};

		fetchFiltersCategories();
	}, []);

	const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'))
	
	return (
		<div className='w-full min-h-screen relative'>
			<Notification
				notificationIcon={
					<X className='w-[50px] h-[50px] text-[var(--color)]' />
				}
				notificationName='Не удалось получить категории. 😓'
				notificationContent='Попробуйте перезагрузить страницу.'
				showNotification={showNotification}
				onClose={() => setShowNotification(false)}
			/>
			<FilterCategoriesContext.Provider value={{ filterCategories }}>
				<Header toggleTheme={toggleTheme} theme={theme} />
				<main className='min-h-screen'>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/notes' element={<NotesCard />} />
						<Route path='/post/:id' element={<PostFullInfo />} />
						<Route path='/note/:id' element={<NoteFullInfo />} />
						<Route path='/mreldarachloapanel' element={<AdminPanel />} />
						<Route path='/*' element={<NotFound />} />
					</Routes>
				</main>
				<Footer />
			</FilterCategoriesContext.Provider>
		</div>
	);
}