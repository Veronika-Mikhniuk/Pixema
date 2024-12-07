import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from '@/context/ThemeContext.jsx'
import { router } from './router.jsx'
import './styles/app.scss'

export default function App() {
    return (
        <ThemeProvider>
            <RouterProvider router={router} />
        </ThemeProvider >
    )
}