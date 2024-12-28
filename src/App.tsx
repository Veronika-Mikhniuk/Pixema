import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from '@/context/ThemeContext.jsx'
import { Provider } from 'react-redux'
import { router } from './router'
import { store } from '@/redux/store'
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