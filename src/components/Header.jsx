import { ThemeContext } from '@/context/ThemeContext'
import { useContext } from 'react'
import { useSelector } from 'react-redux'
import { User } from '@/components/User'
import { AuthNav } from '@/components/AuthNav'
import { SearchForm } from '@/components/SearchForm'
import logoDarkTheme from '@/assets/logo/pixema-logo-dark-theme.svg'
import logoLightTheme from '@/assets/logo/pixema-logo-light-theme.svg'

import '@/styles/header.scss'

export function Header() {
    const { theme } = useContext(ThemeContext)
    const { username, sessionId } = useSelector(state => state.auth)

    const logoSrc = () => {
        return theme === 'light' ? logoLightTheme : logoDarkTheme
    }

    const renderAuthSection = () => {
        if (sessionId) {
            return <User username={username} />
        }
        return <AuthNav />
    }

    return (
        <header className="header">
            <div className="header__logo">
                <img src={logoSrc()} alt="App Logo" />
            </div>
            <div className="container" style={{ display: 'flex' }} >
                <SearchForm />
                <div className="header__auth">
                    {renderAuthSection()}
                </div>
            </div>
        </header>
    )
}