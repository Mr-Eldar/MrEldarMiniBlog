import ContentLoader from 'react-content-loader';

export const UniqueSkeleton = () => {
   return (
		<ContentLoader
			className='w-full h-auto rounded-2xl bg-[var(--post-bg)] mb-10'
			speed={2}
			width="100%"
			height={350}
			viewBox='0 0 100% 350'
			backgroundColor='#bbbbbb'
			foregroundColor='#fff'
		>
			{/* Для десктопа */}
			<rect x='1' y='1' rx='0' ry='0' width='480' height='350' className='hidden md:block' />
			
			{/* Для мобилок - картинка на всю ширину */}
			<rect x='0' y='0' width='100%' height='200' className='rounded-bl-none  md:hidden' />
			
			{/* Контент для десктопа */}
			<rect x='535' y='50' rx='10' ry='10' width='560' height='35' className='hidden md:block' />
			<rect x='535' y='100' rx='10' ry='10' width='350' height='35' className='hidden md:block' />
			<rect x='535' y='170' rx='7' ry='7' width='560' height='22' className='hidden md:block' />
			<rect x='535' y='205' rx='7' ry='7' width='350' height='22' className='hidden md:block' />
			<rect x='535' y='280' rx='5' ry='5' width='80' height='18' className='hidden md:block' />
			
			{/* Контент для мобилок */}
			<rect x='20' y='220' rx='10' ry='10' width='90%' height='30' className='md:hidden' />
			<rect x='20' y='260' rx='8' ry='8' width='70%' height='20' className='md:hidden' />
			<rect x='20' y='290' rx='6' ry='6' width='50%' height='16' className='md:hidden' />
		</ContentLoader>
	);
}