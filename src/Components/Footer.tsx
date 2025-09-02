export const Footer = () => {
	return (
		<div className='container w-full pt-15 pb-15 max-[551px]:gap-5 max-[551px]:w-auto max-[551px]:pl-7.5 max-[551px]:pr-7.5'>
			<div className='w-full h-px bg-[var(--line-color)]'></div>
			<div className='flex items-center justify-between max-[376px]:flex-col'>
				<div className='mt-5 max-[551px]:pr-5 max-sm:pr-0'>
					<h1 className='text-[20px] text-[var(--footer-text-color)] font-medium mb-1 max-[321px]:text-center'>
						Eldar Gaitarov
					</h1>
					<p className='text-[17px] font-medium text-[var(--footer-text-color)] max-[321px]:text-center'>
						Начинающий Frontend-Разработчик
					</p>
				</div>
				<div className='mt-5 max-[376px]:mt-10'>
					<ul className='flex items-center gap-4'>
						<li>
							<a href='https://t.me/Mr_Eldar_Achlo'>
								<i className='text-[22px] fa-brands fa-telegram cursor-pointer text-[var(--color)] transition-colors hover:text-[#20a6e9]'></i>
							</a>
						</li>
						<li>
							<a href='discord://users/1274694144417206324'>
								<i className='text-[22px] fa-brands fa-discord cursor-pointer text-[var(--color)] transition-colors hover:text-[#5661f5]'></i>
							</a>
						</li>
						<li>
							<a href='https://github.com/Mr-Eldar'>
								<i className='text-[22px] fa-brands fa-github cursor-pointer text-[var(--color)] transition-colors hover:text-[#000]'></i>
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};
