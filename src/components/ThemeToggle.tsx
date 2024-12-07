import { useContext } from 'react'
import { ThemeContext } from '@/context/ThemeContext'
import { icons } from '@/assets/icons'

export function ThemeToggle() {
    const { theme, setTheme } = useContext(ThemeContext)

    const toggleTheme = (): void => {
        setTheme(theme === 'light' ? 'dark' : 'light')
    }

    const toggleThemeIcon = (): string => {
        if (theme === 'light') {
            return icons.darkTheme.default
        }
        return icons.darkTheme.active
    }

    return (
        <button
            className="theme-toggle"
            onClick={toggleTheme}
            type="button"
            style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}
        >
            <img src={toggleThemeIcon()} alt="" />
        </button>
    )
}