import { ThemeContext } from '@/context/ThemeContext'
import { useContext } from 'react'
import { User } from '@/components/User'
import { SearchForm } from '@/components/SearchForm'
import logoDarkTheme from '@/assets/logo/pixema-logo-dark-theme.svg'
import logoLightTheme from '@/assets/logo/pixema-logo-light-theme.svg'
import filterIcon from '@/assets/icons/filter-button-icon.svg'

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
                {/* <form className="header__search">
                    <input
                        type="text"
                        placeholder="Search movies"
                    />
                    <button type="button" className="header__filter">
                        <img src={filterIcon} alt="icon" />
                    </button>
                </form> */}
                <div className="header__profile">
                    <User username='Artem_Lapitsky' />
                </div>
            </div>
        </header>
    )
}