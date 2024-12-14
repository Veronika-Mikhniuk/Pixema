import { NavLink } from 'react-router-dom'
import '@/styles/tabSwitcher.scss'

export function TabSwitcher({ path = '' }) {
    return (
        <div style={{ width: '100%' }}>
            <div className="nav">
                <NavLink
                    to={path ? `/${path}/films/1` : "/films/1"}
                    className={() => location.pathname.includes('/films') ? "nav__tab nav__tab_active" : "nav__tab"}
                >
                    Films
                </NavLink>
                <NavLink
                    to={path ? `/${path}/series/1` : "/series/1"}
                    className={() => location.pathname.includes('/series') ? "nav__tab nav__tab_active" : "nav__tab"}
                >
                    Series
                </NavLink>
            </div>
        </div>
    )
}