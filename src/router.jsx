import { createBrowserRouter } from 'react-router-dom'
import { Layout } from '@/components/Layout'
import { Home } from '@/pages/Home'
import { Trends } from '@/pages/Trends'
import { Favourites } from '@/pages/Favorites'
import { Settings } from '@/pages/Settings'

export const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/trends',
                element: <Trends />,
            },
            {
                path: '/favourites',
                element: <Favourites />,
            },
            {
                path: '/settings',
                element: <Settings />,
            }
        ]
    },
])