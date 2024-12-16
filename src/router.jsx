import { createBrowserRouter } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import { Layout } from '@/components/Layout'
import { Home } from '@/pages/Home'
import { Films } from '@/pages/Films'
import { Series } from '@/pages/Series'
import { Popular } from '@/pages/Popular'
import { Favourites } from '@/pages/Favorites'
import { Settings } from '@/pages/Settings'
import { TopRated } from '@/pages/TopRated'
import { Upcoming } from '@/pages/Upcoming'
import { SearchResult } from '@/pages/SearchResult'
import { FilmDetails } from '@/components/FilmDetails'

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
                        element: <Films trending />
                    },
                    {
                        path: 'series/:currentPage',
                        element: <Series trending />
                    }
                ]
            },
            {
                path: '/popular',
                element: <Popular />,
                children: [
                    {
                        path: '',
                        element: <Navigate to="films/1" />
                    },
                    {
                        path: 'films/:currentPage',
                        element: <Films popular />
                    },
                    {
                        path: 'series/:currentPage',
                        element: <Series popular />
                    }
                ]
            },
            {
                path: '/topRated',
                element: <TopRated />,
                children: [
                    {
                        path: '',
                        element: <Navigate to="films/1" />
                    },
                    {
                        path: 'films/:currentPage',
                        element: <Films topRated />
                    },
                    {
                        path: 'series/:currentPage',
                        element: <Series topRated />
                    }
                ]
            },
            {
                path: '/upcoming',
                element: <Upcoming />,
                children: [
                    {
                        path: '',
                        element: <Navigate to="films/1" />
                    },
                    {
                        path: 'films/:currentPage',
                        element: <Films upcoming />
                    },
                    {
                        path: 'series/:currentPage',
                        element: <Series upcoming />
                    }
                ]
            },
            {
                path: '/films/details/:id',
                element: <FilmDetails type='films' />,
            },
            {
                path: '/series/details/:id',
                element: <FilmDetails type='series' />,
            },
            {
                path: '/search/:query',
                element: <SearchResult />,
                children: [
                    {
                        path: '',
                        element: <Navigate to="films/1" />
                    },
                    {
                        path: 'films/:currentPage',
                        element: <Films search />
                    },
                    {
                        path: 'series/:currentPage',
                        element: <Series search />
                    }
                ]
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