import ContentLoader from 'react-content-loader';

export const AllSkeleton = () => {
	return (
		<ContentLoader
			className='rounded-2xl w-full h-auto bg-[var(--post-bg)]'
			speed={2}
			width={492}
			height={536}
			viewBox='0 0 492 536'
			backgroundColor='#bbbbbb'
			foregroundColor='#fff'
		>
			<rect x='0' y='0' rx='0' ry='0' width='492' height='328' />
			<rect x='40' y='365' rx='10' ry='10' width='405' height='35' />
			<rect x='40' y='422' rx='10' ry='10' width='405' height='22' />
			<rect x='40' y='470' rx='10' ry='10' width='80' height='18' />
		</ContentLoader>
	);
};
