import ContentLoader from 'react-content-loader';

export const NotesSekeleton = () => (
	<ContentLoader
      className='bg-[var(--post-bg)] rounded-2xl w-full'
		speed={2}
		width={466}
		height={200}
		viewBox='0 0 466 200'
		backgroundColor='#bbbbbb'
		foregroundColor='#fff'
	>
		<rect x='0' y='40' rx='10' ry='10' width='468' height='25' />
		<rect x='0' y='90' rx='10' ry='10' width='468' height='20' />
		<rect x='0' y='130' rx='10' ry='10' width='300' height='20' />
	</ContentLoader>
);