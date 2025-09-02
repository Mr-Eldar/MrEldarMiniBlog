import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { getPosts, getCountPosts } from '../services/posts';
import { AllSkeleton } from './Skeletons/AllSkeleton';
import { UniqueSkeleton } from './Skeletons/UniqueSkeleton';
import { Pagination } from './Pagination';
import { NotPosts } from '../pages/NotPosts';
import { FilterCategoriesContext } from '../App'

import type { Post } from '../types/post';
import { FadeIn } from './FadeIn';

export const PostCard = () => {
	const navigate = useNavigate();
	const { filterCategories } = React.useContext(FilterCategoriesContext);

	const [posts, setPosts] = React.useState<Post[]>([]);
	const [loading, setLoading] = React.useState(true);
	const [page, setPage] = React.useState(0);
	const [pageCount, setPageCount] = React.useState(0);

	const mainPost = posts[0];
	const otherPosts = posts.slice(1);
	const skeleton = [...Array(4)].map((_, i) => <AllSkeleton key={i} />);
	const limit = 6;

	// Загрузка постов
	React.useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const data = await getPosts(page + 1, limit);
				setPosts(data);
			} catch (error) {
				console.log('Ошибка загрузки постов' + error)
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [page]);

	// Подсчет общего количества постов
	React.useEffect(() => {
		const fetchCount = async () => {
			try {
				const total = await getCountPosts();
				setPageCount(Math.ceil(total / limit));
			} catch (error) {
				console.log('Ошибка подсчета постов' + error);
			}
		};

		fetchCount();
	}, []);

	return (
		(posts.length === 0 && !loading && (
			<NotPosts
				notPostName='Постов нет'
				notPostDescription='На данный момент, на нашем сайте нет постов.'
			/>
		)) || (
			<div className='container box-border w-auto pt-15 max-[551px]:gap-5 max-[551px]:w-auto max-[551px]:pl-7.5 max-[551px]:pr-7.5'>
				{/* Главный пост */}
				{loading ? (
					<UniqueSkeleton />
				) : mainPost ? (
					<FadeIn delay={100}>
						<Link to={`/post/${mainPost?.id}`}>
							<div
								onClick={() => navigate(`/post/${mainPost?.id}`)}
								key={mainPost?.id}
								className='postCard w-full h-[350px] bg-[var(--post-bg)] shadow-[var(--shadow)] rounded-2xl flex hover:-translate-y-2 hover:shadow-xl mb-10 max-md:flex-col max-md:h-auto'
							>
								<>
									<img
										loading='lazy'
										className='w-[50%] object-cover rounded-tl-2xl rounded-bl-2xl max-md:rounded-bl-none max-md:rounded-tr-2xl max-md:w-full'
										src={mainPost.imageUrl}
										alt='Preview'
									/>
									<div className='w-full m-0 p-10 flex flex-col justify-around max-[870px]:p-7 max-md:gap-4'>
										<h1 className='font-bold text-[35px] leading-10 text-[var(--color)] max-[870px]:text-[33px] max-[870px]:leading-8 max-md:whitespace-nowrap max-md:overflow-hidden max-md:text-ellipsis'>
											{mainPost.title}
										</h1>
										<p className='font-medium text-[18px] text-[var(--color)]'>
											{mainPost.miniDescription}
										</p>
										<div className='flex items-center gap-3'>
											<div
												className='w-2 h-2 rounded-full text-balance'
												style={{
													backgroundColor:
														filterCategories[mainPost.postCategory - 1]
															?.category_color,
												}}
											></div>
											<h4 className='font-medium text-[18px] text-[var(--color)] mt-[2px]'>
												{filterCategories[mainPost.postCategory - 1]?.name}
											</h4>
										</div>
									</div>
								</>
							</div>
						</Link>
					</FadeIn>
				) : null}

				{/* Сетка постов */}
				<div className='grid grid-cols-2 gap-10 max-md:grid-cols-1'>
					{loading
						? skeleton
						: otherPosts.map(post => (
							<FadeIn delay={200}>
								<>
									<Link to={`/post/${post.id}`}>
										<div
											key={post?.id}
											onClick={() => navigate(`/post/${post?.id}`)}
											className='postCard w-full h-auto bg-[var(--post-bg)] shadow-[var(--shadow)] rounded-2xl flex flex-col hover:-translate-y-2 hover:shadow-xl'
										>
											<img
												className='w-auto rounded-tl-2xl rounded-tr-2xl'
												src={post?.imageUrl}
												alt='Preview'
											/>
											<div className='m-0 p-10 flex flex-col justify-around gap-5 w-full'>
												<h1 className='font-bold text-[35px] leading-10 text-[var(--color)] max-[870px]:text-[33px] max-[870px]:leading-8 max-md:whitespace-nowrap max-md:overflow-hidden max-md:text-ellipsis max-[905px]:text-[30px]'>
													{post?.title}
												</h1>
												<p className='font-medium text-[18px] text-[var(--color)]'>
													{post?.miniDescription}
												</p>
												<div className='flex items-center gap-3'>
													<div
														className='w-2 h-2 rounded-full'
														style={{
															backgroundColor:
																filterCategories[post.postCategory - 1]
																	?.category_color,
														}}
													></div>
													<h4 className='font-medium text-[18px] text-[var(--color)] mt-[2px]'>
														{filterCategories[post.postCategory - 1]?.name}
													</h4>
												</div>
											</div>
										</div>
									</Link>
								</>
							</FadeIn>
						))}
				</div>
				{pageCount > 1 && 
					<Pagination pageCount={pageCount} onPageChange={setPage} />
				}
			</div>
		)
	);
};
