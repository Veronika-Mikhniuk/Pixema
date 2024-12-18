import { ThemeContext } from '@/context/ThemeContext'
import { useContext } from 'react'
import { User } from '@/components/User'
import { SearchForm } from '@/components/SearchForm'
import logoDarkTheme from '@/assets/logo/pixema-logo-dark-theme.svg'
import logoLightTheme from '@/assets/logo/pixema-logo-light-theme.svg'

import '@/styles/header.scss'

export function Header() {
    const { theme } = useContext(ThemeContext)

    const logoSrc = () => {
        return theme === 'light' ? logoLightTheme : logoDarkTheme
    }

    return (
        <header className="header">
            <div className="header__logo">
                <img src={logoSrc()} alt="App Logo" />
            </div>
            <div className="container" style={{ display: 'flex' }} >
                <SearchForm />
                <div className="header__profile">
                    <User username='Artem_Lapitsky' />
                </div>
            </div>
        </header>
    )
}