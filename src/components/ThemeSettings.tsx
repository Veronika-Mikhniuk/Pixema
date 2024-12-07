import { Title } from './Title'
import { ThemeToggle } from '@/components/ThemeToggle'
import '@/styles/themeSettings.scss'

export function ThemeSettings() {
    return (
        <div className="theme-settings">
            <Title secondary>Color Mode</Title>
            <div className="theme-settings__card">
                <div className="theme-settings__content">
                    <p className="theme-settings__title">Dark</p>
                    <p className="theme-settings__description">Use dark theme</p>
                </div>
                <div className="theme-settings__toggle">
                    <ThemeToggle />
                </div>
            </div>
        </div>
    )
}