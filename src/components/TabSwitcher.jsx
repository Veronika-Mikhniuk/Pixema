import { NavLink } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import '@/styles/tabSwitcher.scss'

export function TabSwitcher({ path = '' }) {
    const { query } = useParams() // subscripton on path changes! without it don't work
    const searchQuery = useSelector(state => state.films.searchQuery)

    const getSearchPath = () => {
        if (path === 'search' && searchQuery) {
            return `/search/${searchQuery}`
        }
        return path ? `/${path}` : ''
    }

    return (
        <div className="nav">
            <NavLink
                to={`${getSearchPath()}/films/1`}
                className={() => location.pathname.includes('/films') ? "nav__tab nav__tab_active" : "nav__tab"}
            >
                Films
            </NavLink>
            <NavLink
                to={`${getSearchPath()}/series/1`}
                className={() => location.pathname.includes('/series') ? "nav__tab nav__tab_active" : "nav__tab"}
            >
                Series
            </NavLink>
        </div>
    )
}