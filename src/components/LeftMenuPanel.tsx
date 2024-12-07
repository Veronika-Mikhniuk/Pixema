import { useState } from 'react'
import { NavLink } from "react-router-dom"
import { icons } from '@/assets/icons'
import { PageType, IMenuItem } from '@/types/MenuTypes'
import '@/styles/leftMenuPanel.scss'

export function LeftMenuPanel() {
    const [hoveredItem, setHoveredItem] = useState<PageType | null>(null)

    const getIconSrc = (page: PageType, isActive: boolean, isHovered: boolean) => {
        return isActive || isHovered ? icons.nav[page].active : icons.nav[page].default;
    }

    const menuItems: IMenuItem[] = [
        { path: '/', page: 'home', text: 'Home' },
        { path: '/trends', page: 'trends', text: 'Trends' },
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
                                className={({ isActive }) => isActive ? 'active' : ''}
                                onMouseEnter={() => setHoveredItem(item.page)}
                                onMouseLeave={() => setHoveredItem(null)}
                            >
                                {({ isActive }) => (
                                    <>
                                        <img
                                            src={getIconSrc(item.page, isActive, hoveredItem === item.page)}
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