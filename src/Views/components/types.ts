export interface TPagination {
    handlePageChange: (page: number) => void
    currentPage:      number;
    totalPages:       number;
}
