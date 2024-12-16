import { NavLink } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import '@/styles/tabSwitcher.scss'

export function TabSwitcher({ path = '' }) {
    const { query } = useParams() // subscripton on path changes! without it don't work
    const searchQuery = useSelector(state => state.films.searchQuery)

    const getPath = (type) => {
        if (path === 'search' && searchQuery) {
            return `/${type}/search/${searchQuery}/1`
        }
        switch (path) {
            case 'popular':
            case 'topRated':
            case 'upcoming':
                return `/${path}/${type}/1`
            default:
                return `/${type}/1`
        }
    }

    return (
        <div className="nav">
            <NavLink
                to={getPath('films')}
                className={() => location.pathname.includes('/films') ? "nav__tab nav__tab_active" : "nav__tab"}
            >
                Films
            </NavLink>
            <NavLink
                to={getPath('series')}
                className={() => location.pathname.includes('/series') ? "nav__tab nav__tab_active" : "nav__tab"}
            >
                Series
            </NavLink>
        </div>
    )
}