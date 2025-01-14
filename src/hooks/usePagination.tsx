import { useState } from 'react';

interface UsePaginationProps {
  initialPage?: number;
}

const usePagination = ({ initialPage = 1 }: UsePaginationProps) => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  return {
    currentPage,
    setCurrentPage,
    handlePageChange,
  };
};

export default usePagination;
