import { NavLink } from 'react-router-dom'
import '@/styles/tabSwitcher.scss'

export function TabSwitcher({ path = '' }) {
    return (
        <div style={{ width: '100%' }}>
            <div className="nav">
                <NavLink
                    to={path ? `/${path}/films` : "/films"}
                    className={({ isActive }) => isActive ? "nav__tab nav__tab_active" : "nav__tab"}
                >
                    Films
                </NavLink>
                <NavLink
                    to={path ? `/${path}/tv` : "/series"}
                    className={({ isActive }) => isActive ? "nav__tab nav__tab_active" : "nav__tab"}
                >
                    Series
                </NavLink>
            </div>
        </div>
    )
}