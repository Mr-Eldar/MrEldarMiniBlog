import ReactPaginate from 'react-paginate';

import { ChevronLeft, ChevronRight } from 'lucide-react';

import '../index.css'

type Props = {
	pageCount: number;
	onPageChange: (page: number) => void;
}

export function Pagination({ pageCount, onPageChange }: Props) {
	return (
		<ReactPaginate
			className='pagination flex items-center justify-center gap-3 mt-15 text-[20px] font-mediu shadow-[var(--shadow)] rounded-[10px] p-2'
			breakLabel='...'
			nextLabel={<ChevronRight />}
			previousLabel={<ChevronLeft />}
			pageRangeDisplayed={4}
			pageCount={pageCount}
			onPageChange={event => onPageChange(event.selected)}
			forcePage={0}
			renderOnZeroPageCount={null}
		/>
	);
}