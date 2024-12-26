import { ThemeContext } from '@/context/ThemeContext'
import { useContext } from 'react'
import { useSelector } from 'react-redux'
import { User } from '@/components/User'
import { AuthNav } from '@/components/AuthNav'
import { SearchForm } from '@/components/SearchForm'
import { RootState } from '@/redux/store'
import logoDarkTheme from '@/assets/logo/pixema-logo-dark-theme.svg'
import logoLightTheme from '@/assets/logo/pixema-logo-light-theme.svg'

import '@/styles/header.scss'

export function Header() {
    const { theme } = useContext(ThemeContext)
    const { username, sessionId } = useSelector((state: RootState) => state.auth)

    const logoSrc = (): string => {
        return theme === 'light' ? logoLightTheme : logoDarkTheme
    }

    return (
        <header className="header">
            <div className="header__logo">
                <img src={logoSrc()} alt="App Logo" />
            </div>
            <div className="container" style={{ display: 'flex' }} >
                <SearchForm />
                <div className="header__auth">
                    {sessionId ? <User username={username || ''} /> : <AuthNav />}
                </div>
            </div>
        </header>
    )
}