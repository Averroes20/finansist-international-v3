import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from '@/components/ui/pagination';

interface PaginationProps {
  meta: {
    page: number;
    totalPages: number;
  };
  handlePageChange: (page: number) => void;
}

const generatePageNumbers = (totalPages: number, currentPage: number) => {
  const pageNumbers: (number | string)[] = [];
  const pageLimit = 3;
  if (totalPages <= pageLimit) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    const start = Math.max(1, currentPage - 1);
    const end = Math.min(totalPages, currentPage + 1);

    if (start > 1) pageNumbers.push(1);
    if (start > 2) pageNumbers.push('...');

    for (let i = start; i <= end; i++) {
      pageNumbers.push(i);
    }

    if (end < totalPages - 1) pageNumbers.push('...');
    if (end < totalPages) pageNumbers.push(totalPages);
  }
  return pageNumbers;
};

const PaginationComponent = ({ meta, handlePageChange }: PaginationProps) => {
  const pageNumbers = generatePageNumbers(meta.totalPages, meta.page);

  return (
    <Pagination>
      <PaginationContent className="flex justify-center items-center my-4 space-x-2">
        <PaginationItem className={meta.page <= 1 ? 'pointer-events-none cursor-not-allowed opacity-50' : 'cursor-pointer'}>
          <PaginationPrevious onClick={() => handlePageChange(meta.page - 1)} aria-disabled={meta.page <= 1} />
        </PaginationItem>

        {/* Menampilkan nomor halaman yang dapat diklik */}
        {pageNumbers.map((pageNumber, index) => (
          <PaginationItem key={`${index}-${pageNumber}`}>
            {pageNumber === '...' ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                href="#"
                isActive={meta.page === pageNumber}
                aria-current={meta.page === pageNumber ? 'page' : undefined}
                className={meta.page === pageNumber ? 'bg-slate-800 hover:bg-slate-950 hover:text-white text-white' : ''}
                onClick={() => handlePageChange(pageNumber as number)}
              >
                {pageNumber}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem className={meta.page >= meta.totalPages ? 'pointer-events-none cursor-not-allowed opacity-50' : 'cursor-pointer'}>
          <PaginationNext onClick={() => handlePageChange(meta.page + 1)} aria-disabled={meta.page >= meta.totalPages} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponent;
