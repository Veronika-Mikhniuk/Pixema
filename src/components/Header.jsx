import { User } from '@/components/User'
import '@/styles/header.scss'
import logo from '@/assets/logo/pixema-logo.svg'
import filterIcon from '@/assets/icons/filter-button-icon.svg'

export function Header() {
    return (
        <header className="header">
            <div className="header__logo">
                <img src={logo} alt="App Logo" />
            </div>
            <div className="container" style={{ display: 'flex' }} >
                <form className="header__search">
                    <input type="text" placeholder="Search movies" />
                    <button type="button" className="header__filter">
                        <img src={filterIcon} alt="icon" />
                    </button>
                </form>
                <div className="header__profile">
                    <User username='Artem_Lapitsky' />
                </div>
            </div>
        </header>
    )
}