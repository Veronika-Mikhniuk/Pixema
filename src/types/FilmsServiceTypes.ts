import { IFilm } from '@/types/IFilm'
import { IGenre } from '@/types/IGenre'


export interface IRequestFilmsParams {
    type?: 'films' | 'series'
    endpoint?: 'all' | 'trending' | 'popular' | 'topRated' | 'upcoming' | 'details' | 'search' | 'favourites'
    accountId?: string
    [key: string]: string | number | boolean | undefined
}

export interface IRequestFilmParams {
    id?: number | string
    type?: 'films' | 'series'
}

export interface IRequestResponse {
    results?: IFilm[]
    total_pages?: number
    hasError?: boolean
    message?: string
    genres?: IGenre[]
}