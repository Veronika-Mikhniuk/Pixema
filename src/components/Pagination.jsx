import { NavLink, useNavigate } from 'react-router-dom'
import { buildSchemePagination } from '@/utils/buildSchemePagination'
import '@/styles/pagination.scss'

export function Pagination({ currentPage, pageCount, url }) {
    const navigate = useNavigate()
    const currentPageNumber = Number(currentPage)

    const renderPaginationItems = () => {
        const scheme = buildSchemePagination(currentPage, pageCount)

        return scheme.map((item, index) => {
            return (
                <li className="pagination__item" key={index}>
                    {item == '...'
                        ? <span className="pagination__dots">...</span>
                        : <NavLink className={({ isActive }) => isActive ? "pagination__link pagination__link_active" : "pagination__link"} to={`${url}/${item}`}>{item}</NavLink>}
                </li >
            )
        })
    }

    const handlePrevClick = () => {
        if (currentPageNumber > 1) {
            navigate(`${url}/${currentPageNumber - 1}`)
        }
    }

    const handleNextClick = () => {
        if (currentPageNumber < pageCount) {
            navigate(`${url}/${currentPageNumber + 1}`)
        }
    }

    return (
        <nav className="pagination-nav">
            <button
                className={`pagination-nav__prev-button ${currentPageNumber <= 1 ? 'pagination-nav__button_disabled' : ''}`}
                onClick={handlePrevClick}
            >
                <svg width="24" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.7095 7.29238C10.8995 7.49238 10.9995 7.74238 10.9995 8.00238C10.9995 8.26238 10.8995 8.51238 10.7095 8.71238L7.40945 12.0024L19.9995 12.0024C20.5495 12.0024 20.9995 12.4524 20.9995 13.0024C20.9995 13.5524 20.5495 14.0024 19.9995 14.0024L7.40945 14.0024L10.7095 17.2924C11.0995 17.6824 11.0995 18.3224 10.7095 18.7124C10.3195 19.1024 9.67945 19.1024 9.28945 18.7124L4.28945 13.7124C4.19945 13.6224 4.12945 13.5124 4.07945 13.3924C4.05945 13.3424 4.03945 13.3024 4.03945 13.2524C3.98945 13.0924 3.98945 12.9124 4.03945 12.7524C4.03945 12.7024 4.05945 12.6624 4.07945 12.6124C4.12945 12.4924 4.19945 12.3824 4.28945 12.2924L9.28945 7.29238C9.67945 6.90238 10.3195 6.90238 10.7095 7.29238Z" fill="currentColor" />
                </svg>
                Prev
            </button>

            <ul className="pagination">
                {renderPaginationItems()}
            </ul>

            <button
                className={`pagination-nav__next-button ${currentPageNumber >= pageCount ? 'pagination-nav__button_disabled' : ''}`}
                onClick={handleNextClick}
            >
                Next
                <svg width="24" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M13.2905 16.7076C13.1005 16.5076 13.0005 16.2576 13.0005 15.9976C13.0005 15.7376 13.1005 15.4876 13.2905 15.2876L16.5905 11.9976L4.00055 11.9976C3.45055 11.9976 3.00055 11.5476 3.00055 10.9976C3.00055 10.4476 3.45055 9.99762 4.00055 9.99762L16.5905 9.99762L13.2905 6.70762C12.9005 6.31762 12.9005 5.67762 13.2905 5.28762C13.6805 4.89762 14.3205 4.89762 14.7105 5.28762L19.7105 10.2876C19.8005 10.3776 19.8705 10.4876 19.9205 10.6076C19.9405 10.6576 19.9605 10.6976 19.9605 10.7476C20.0105 10.9076 20.0105 11.0876 19.9605 11.2476C19.9605 11.2976 19.9405 11.3376 19.9205 11.3876C19.8705 11.5076 19.8005 11.6176 19.7105 11.7076L14.7105 16.7076C14.3205 17.0976 13.6805 17.0976 13.2905 16.7076Z" fill="currentColor" />
                </svg>
            </button>
        </nav >
    )
}