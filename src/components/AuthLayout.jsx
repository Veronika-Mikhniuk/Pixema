import { Outlet } from 'react-router-dom'
import logoDarkTheme from '@/assets/logo/pixema-logo-dark-theme.svg'
import '@/styles/authLayout.scss'

export function AuthLayout() {
    return (
        <div className="auth-layout">
            <div className="auth-layout__background" />
            <div className="auth-layout__logo">
                <img src={logoDarkTheme} alt="Pixema" />
            </div>
            <div className="auth-layout__content">
                <Outlet />
            </div>
        </div>
    )
}