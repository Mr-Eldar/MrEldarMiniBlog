import { Link } from 'react-router-dom'

import NotFoundSvg from '../assets/NotFound.svg'
import { MoveLeft } from 'lucide-react';

export const NotFound = () => {
	return (
		<div className='w-full h-screen flex flex-col justify-center gap-6 items-center text-4xl text-white mt-15'>
			<img className='scale-100 max-[426px]:scale-90' src={NotFoundSvg} alt='NotFound' />
			<h1 className='font-bold text-8xl text-[var(--color)] max-[426px]:text-7xl'>404</h1>
			<p className='font-semibold -mt-5 text-[var(--footer-text-color)] text-3xl max-[426px]:text-2xl'>
				страница не найдена
			</p>
			<Link to={'/'}>
				<button className='notFoundBtn w-50 px-5 py-3 bg-[var(--btn-bg)] rounded-[10px] cursor-pointer flex items-center justify-center max-[426px]:py-2.5'>
					<span className='text-[22px] text-[var(--btn-color)] flex items-center gap-1'>
						<MoveLeft />
						на главную
					</span>
				</button>
			</Link>
		</div>
	);
};
