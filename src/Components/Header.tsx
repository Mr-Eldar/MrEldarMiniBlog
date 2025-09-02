import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import { ThemeToggle } from './ThemeToggle';

import Logo from '../assets/logo-small.jpg'

type Props = { theme: 'light' | 'dark'; toggleTheme: () => void }

export const Header = ({ toggleTheme, theme }: Props) => {
	const location = useLocation()

   const [globalTheme, setGlobalTheme] = React.useState(theme === 'dark')
	const [burgerMenuOpen, setBurgerMenuOpen] = React.useState(false)

	const toggleBurgerStatus = () => { 
		setBurgerMenuOpen(prev => !prev)
		document.querySelector('.burgerMenu')?.classList.toggle('active') 
	}

   React.useEffect(() => { setGlobalTheme(theme === 'dark'); }, [theme])

	return (
		<div className='relative'>
			<div className='container w-auto pt-10 flex items-center justify-between max-[551px]:gap-5 max-[551px]:w-auto max-[551px]:pl-7.5 max-[551px]:pr-7.5'>
				{/* Логотип */}
				<Link to={'/'}>
					<div className='flex items-center gap-4 max-[551px]:gap-2'>
						<img
							className='w-12 rounded-full max-[551px]:w-10'
							src={Logo}
							alt='Logo'
						/>
						<h1 className='text-4xl font-bold text-[var(--color)] max-[551px]:text-3xl'>
							MRELDAR
						</h1>
					</div>
				</Link>

				{/* Бургер меню */}
				<div
					onClick={toggleBurgerStatus}
					className='burgerMenu w-auto h-auto hidden max-[551px]:block'
				>
					<ul className='flex flex-col items-center justify-center gap-[5px] cursor-pointer'>
						<li className='w-6 h-[3px] bg-[var(--color)] rounded-full'></li>
						<li className='w-6 h-[3px] bg-[var(--color)] rounded-full'></li>
						<li className='w-6 h-[3px] bg-[var(--color)] rounded-full'></li>
					</ul>
				</div>

				{/* Навигация */}
				<div className='navigation flex items-center justify-center max-[551px]:hidden'>
					<ul className='flex items-center gap-4 text-[20px] '>
						<li
							className={`mr-3 ${
								location.pathname === '/' ? 'opacity-100' : 'opacity-70'
							} hover:opacity-100`}
						>
							<Link to={'/'}>Главная</Link>
						</li>
						<li
							className={`mr-3 ${
								location.pathname === '/notes' ? 'opacity-100' : 'opacity-70'
							} hover:opacity-100`}
						>
							<Link to={'/notes'}>Заметки</Link>
						</li>
						<li
							onClick={() => toggleTheme()}
							className='w-6 h-6 -mt-0.5 flex items-center relative cursor-pointer'
						>
							<ThemeToggle buttonClick={globalTheme} />
						</li>
					</ul>
				</div>
			</div>

			<div
				className={`burgerMenuList absolute flex flex-col items-center justify-center bg-[var(--bg)] text-[var(--color)] h-screen z-50 max-[551px]:gap-5 max-[551px]:w-auto max-[551px]:pl-7.5 max-[551px]:pr-7.5 ${
					burgerMenuOpen === true ? 'active' : ''
				}`}
			>
				<ul className='flex flex-col items-center justify-center gap-4 text-[20px] '>
					<li
						className={`${
							location.pathname === '/'
								? 'text-[var(--color)]'
								: 'text-[#6a6e72]'
						} hover:opacity-100 text-[24px]`}
					>
						<Link to={'/'}>Главная</Link>
					</li>
					<li
						className={`text-[24px] ${
							location.pathname === '/notes' ? 'text-white' : 'text-[#6a6e72]'
						}`}
					>
						<Link to={'/notes'}>Заметки</Link>
					</li>
					<li
						onClick={() => toggleTheme()}
						className='w-6 h-6 -mt-0.5 flex items-center relative cursor-pointer'
					>
						<ThemeToggle buttonClick={globalTheme} />
					</li>
				</ul>
			</div>
		</div>
	);
};
