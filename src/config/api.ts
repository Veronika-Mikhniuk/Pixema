import { IApiConfig, IApiEndpoints, IDefaultParams } from '@/types/ApiTypes'

export const apiConfig: IApiConfig = {
    baseUrl: 'https://api.themoviedb.org/3',
    token: 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZmZiNjI1MjllOTc3ZWJlMDBhMWZkZTk5NmVjMWM1OSIsIm5iZiI6MTczNTI5MTkzMS40MzEsInN1YiI6IjY3NmU3NDFiMmM5MDk3YjI2NjYxNTZhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6X3ZOVLGvs0yiyVdspjCJ1zLfKH9r_6_rL-Em0XNe0U'
}

export const apiEndpoints: IApiEndpoints = {
    films: {
        all: '/discover/movie', // have filtering queryParams
        trending: '/trending/movie/week', // have day or week param
        // have only pagination pages
        popular: '/movie/popular',
        topRated: '/movie/top_rated',
        upcoming: '/movie/upcoming',

        details: '/movie',
        search: '/search/movie'
    },
    series: {
        all: '/discover/tv', // have filtering queryParams
        trending: '/trending/tv/week', // have day or week param
        // have only pagination pages
        popular: '/tv/popular',
        topRated: '/tv/top_rated',
        upcoming: '/tv/on_the_air',

        details: '/tv',
        search: '/search/tv'
    },
    auth: {
        requestToken: '/authentication/token/new',
        validateWithLogin: '/authentication/token/validate_with_login',
        createSession: '/authentication/session/new',
        getAccount: '/account'
    }
}

export const defaultParams: IDefaultParams = {
    include_adult: false,
    include_video: false,
    language: 'en-US',
}

export const baseImgUrl = 'https://image.tmdb.org/t/p/'

export const maxPageLimit = 500 //according to api docs 