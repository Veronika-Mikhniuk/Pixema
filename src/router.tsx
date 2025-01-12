import { createBrowserRouter, RouteObject } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import { Layout } from '@/components/Layout'
import { AuthLayout } from '@/components/AuthLayout'
import { Home } from '@/pages/Home'
import { Films } from '@/pages/Films'
import { Series } from '@/pages/Series'
import { Popular } from '@/pages/Popular'
import { Favourites } from '@/pages/Favorites'
import { Settings } from '@/pages/Settings'
import { TopRated } from '@/pages/TopRated'
import { Upcoming } from '@/pages/Upcoming'
import { SearchResult } from '@/pages/SearchResult'
import { Film } from '@/pages/Film'
import { SignIn } from '@/pages/SignIn'
import { SignUp } from '@/pages/SignUp'
import { Profile } from '@/pages/Profile'

const routes: RouteObject[] = [
    {
        path: '/auth',
        element: <AuthLayout />,
        children: [
            {
                path: 'sign-in',
                element: <SignIn />
            },
            {
                path: 'sign-up',
                element: <SignUp />
            }
        ]
    },
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
                path: '/favourites',
                element: <Favourites />,
                children: [
                    {
                        path: '',
                        element: <Navigate to="films/1" />
                    },
                    {
                        path: 'films/:currentPage',
                        element: <Films favorites />
                    },
                    {
                        path: 'series/:currentPage',
                        element: <Series favorites />
                    }
                ]
            },
            {
                path: '/films',
                children: [
                    {
                        path: 'details/:id',
                        element: <Film type="films" />,
                    },
                    {
                        path: 'search/:query',
                        element: <SearchResult />,
                        children: [
                            {
                                path: '',
                                element: <Navigate to="1" />
                            },
                            {
                                path: ':currentPage',
                                element: <Films search />
                            }
                        ]
                    }
                ]
            },
            {
                path: '/series',
                children: [
                    {
                        path: 'details/:id',
                        element: <Film type="series" />,
                    },
                    {
                        path: 'search/:query',
                        element: <SearchResult />,
                        children: [
                            {
                                path: '',
                                element: <Navigate to="1" />
                            },
                            {
                                path: ':currentPage',
                                element: <Series search />
                            }
                        ]
                    }
                ]
            },
            {
                path: '/profile',
                element: <Profile />,
            },
            {
                path: '/settings',
                element: <Settings />,
            }
        ]
    },
]

export const router = createBrowserRouter(routes)