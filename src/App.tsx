import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from '@/context/ThemeContext.jsx'
import { Provider } from 'react-redux'
import { router } from './router.jsx'
import { store } from '@/redux/store.ts'
import './styles/app.scss'

export default function App() {
    return (
        <Provider store={store}>
            <ThemeProvider>
                <RouterProvider router={router} />
            </ThemeProvider >
        </Provider >
    )
}