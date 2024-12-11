import { createBrowserRouter } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import { Layout } from '@/components/Layout'
import { Home } from '@/pages/Home'
import { Films } from '@/pages/Films'
import { Series } from '@/pages/Series'
import { Popular } from '@/pages/Popular'
import { Favourites } from '@/pages/Favorites'
import { Settings } from '@/pages/Settings'

export const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Home />,
                children: [
                    {
                        path: '',
                        element: <Navigate to="films/1" />
                    },
                    {
                        path: 'films/:currentPage',
                        element: <Films />
                    },
                    {
                        path: 'series/:currentPage',
                        element: <Series />
                    }
                ]
            },
            {
                path: '/popular',
                element: <Popular />,
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