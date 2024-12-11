type PaginationItem = string | number

export const buildSchemePagination = (currentPage: number, pageCount: number): PaginationItem[] => {
    const maxVisiblePages = 10
    const pagination: PaginationItem[] = []

    if (pageCount <= maxVisiblePages) {
        return [...Array(pageCount)].map((_, i) => i + 1)
    }

    // Calculating the start and end pages in the range
    const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    const endPage = Math.min(pageCount, startPage + maxVisiblePages - 1)

    // Correcting start page
    const correctedStartPage = Math.max(1, endPage - maxVisiblePages + 1)

    // Forming of the main range
    for (let i = correctedStartPage; i <= endPage; i++) {
        pagination.push(i)
    }

    // Adding 1, 2 or ... at the beginning of array
    if (correctedStartPage > 3) {
        pagination.unshift('...')
        pagination.unshift(1)
    } else if (correctedStartPage === 3) {
        pagination.unshift(2)
        pagination.unshift(1)
    } else if (correctedStartPage === 2) {
        pagination.unshift(1)
    }

    // Adding lastPage, preLastPage or ... at the end of array
    if (endPage < pageCount - 2) {
        pagination.push('...')
        pagination.push(pageCount)
    } else if (endPage === pageCount - 2) {
        pagination.push(pageCount - 1)
        pagination.push(pageCount)
    } else if (endPage === pageCount - 1) {
        pagination.push(pageCount)
    }

    return pagination
}