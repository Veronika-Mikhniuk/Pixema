import { NavLink } from 'react-router-dom'
import { buildSchemePagination } from '@/utils/buildSchemePagination'
import '@/styles/pagination.scss'

export function Pagination({ currentPage, pageCount, url }) {
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

    return (
        <nav aria-label="...">
            <ul className="pagination">
                {renderPaginationItems()}
            </ul>
        </nav>
    )
}