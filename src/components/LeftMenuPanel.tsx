import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { icons } from '@/assets/icons'
import { PageType, IMenuItem } from '@/types/MenuTypes'
import { Footer } from '@/components/Footer'
import { RootState } from '@/redux/store'
import '@/styles/leftMenuPanel.scss'

export function LeftMenuPanel() {
    const [hoveredItem, setHoveredItem] = useState<PageType | null>(null)
    const location = useLocation()
    const { activeFilters } = useSelector((state: RootState) => state.films)

    const isLinkActive = (path: string): boolean => {
        // return true or false
        if (path === '/') {
            return location.pathname.startsWith('/films') || location.pathname.startsWith('/series')
        }
        return location.pathname.startsWith(path)
    }

    const menuItems: IMenuItem[] = [
        { path: '/', page: 'home', text: 'Home' },
        { path: '/popular', page: 'popular', text: 'Popular' },
        { path: '/topRated', page: 'topRated', text: 'Top Rated' },
        { path: '/upcoming', page: 'upcoming', text: 'Upcoming' },
        { path: '/favourites', page: 'favourite', text: 'Favourites' },
        { path: '/settings', page: 'settings', text: 'Settings' },
    ]

    const getPath = (path: string): string => {
        if (path === '/' && activeFilters) {
            const searchParams = new URLSearchParams(activeFilters).toString()
            return `/films/1?${searchParams}`
        }
        return path
    }

    const getIconSrc = (page: PageType, isActive: boolean, isHovered: boolean): string => {
        return isActive || isHovered ? icons.nav[page].active : icons.nav[page].default
    }

    return (
        <div className="menu">
            <div className="menu__content">
                <nav className="menu__nav">
                    <ul className="menu__list">
                        {menuItems.map(item => ( // mapping based on menuItems
                            <li key={item.page}>
                                <NavLink
                                    to={getPath(item.path)}
                                    className={() => isLinkActive(item.path) ? 'active' : ''}
                                    onMouseEnter={() => setHoveredItem(item.page)}
                                    onMouseLeave={() => setHoveredItem(null)}
                                >
                                    {() => (
                                        <>
                                            <img
                                                src={getIconSrc(item.page, isLinkActive(item.path), hoveredItem === item.page)}
                                                alt={`${item.text} icon`}
                                            />
                                            {item.text}
                                        </>
                                    )}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
            <div className="menu__footer">
                <Footer />
            </div>
        </div>
    )
}