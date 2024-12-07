import { createContext, useLayoutEffect, useState } from 'react'
import { Theme, IThemeContext } from '@/types/ThemeTypes'

export const ThemeContext = createContext<IThemeContext>({
    theme: 'dark',
    setTheme: () => { }
})

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState((localStorage.getItem('app-theme') || 'dark') as Theme)

    useLayoutEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
        localStorage.setItem('app-theme', theme)
    }, [theme])

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}