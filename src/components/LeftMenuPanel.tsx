import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { icons } from '@/assets/icons'
import { PageType, IMenuItem } from '@/types/MenuTypes'
import '@/styles/leftMenuPanel.scss'

export function LeftMenuPanel() {
    const [hoveredItem, setHoveredItem] = useState<PageType | null>(null)
    const location = useLocation()

    const isLinkActive = (path: string) => {
        // return true or false
        if (path === '/') {
            return location.pathname === '/' || location.pathname === '/films' || location.pathname === '/series'
        }
        return location.pathname.startsWith(path)
    }

    const getIconSrc = (page: PageType, isActive: boolean, isHovered: boolean) => {
        return isActive || isHovered ? icons.nav[page].active : icons.nav[page].default
    }

    const menuItems: IMenuItem[] = [
        { path: '/', page: 'home', text: 'Home' },
        { path: '/popular', page: 'popular', text: 'Popular' },
        { path: '/favourites', page: 'favourite', text: 'Favourites' },
        { path: '/settings', page: 'settings', text: 'Settings' },
    ]

    return (
        <div className="menu">
            <nav className="menu__nav">
                <ul className="menu__list">
                    {menuItems.map(item => ( // mapping based on menuItems
                        <li key={item.page}>
                            <NavLink
                                to={item.path}
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
    )
}