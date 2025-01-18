import { useEffect } from 'react'
import { useParams, useSearchParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { fetchFavoriteIds, fetchFilms } from '@/redux/films-slice'
import { updateFilmsList } from '@/redux/films-slice'
import { maxPageLimit } from '@/config/api'
import { FilmGrid } from './FilmsGrid'
import { Pagination } from '@/components/Pagination'
import { fetchGenres } from '@/redux/films-slice'
import { convertUrlFilterParams } from '@/utils/prepareFilterParams'
import { RootState } from '@/redux/store'
import { AppDispatch } from '@/redux/store'

interface IFilmListProps {
    type: 'films' | 'series'
    endpoint: 'search' | 'trending' | 'all' | 'popular' | 'topRated' | 'upcoming' | 'favourites'
}

export function FilmList({ type, endpoint }: IFilmListProps) {
    const { currentPage } = useParams()
    const dispatch = useDispatch<AppDispatch>()
    const [searchParams] = useSearchParams() // take queryparams from url
    const { list: films, loading, error, pageCount, searchQuery, favoriteIds } = useSelector((state: RootState) => state.films)
    const { sessionId, accountId } = useSelector((state: RootState) => state.auth)

    const avaliablePageCount = Math.min(pageCount || 0, maxPageLimit)

    const getPaginationBaseUrl = (): string => {
        if (endpoint === 'search') {
            return `/${type}/search/${searchQuery}`
        }

        if (endpoint === 'trending' || endpoint === 'all') {
            return `/${type}`
        }
        return `/${endpoint}/${type}`
    }

    useEffect(() => {
        if (endpoint === 'favourites') {
            const filteredFilms = films.filter(film => favoriteIds.includes(film.id));
            dispatch(updateFilmsList(filteredFilms))
        }
    }, [favoriteIds, endpoint]);

    useEffect(() => {
        dispatch(fetchGenres())
        const filterParams = Object.fromEntries(searchParams) // transform queryparams from url into object
        const preparedFilterParams = convertUrlFilterParams(filterParams, type) // change params depending on films or series path

        if (sessionId) {
            dispatch(fetchFavoriteIds(type))
        }

        if (endpoint === 'search' && searchQuery) {
            dispatch(fetchFilms({ type, endpoint, query: searchQuery, page: currentPage }))
        } else if (endpoint === 'favourites' && accountId) {
            dispatch(fetchFilms({ type, endpoint, accountId, page: currentPage }))
        } else {
            dispatch(fetchFilms({ type, endpoint, ...preparedFilterParams, page: currentPage }))
        }

    }, [currentPage, searchQuery, searchParams, dispatch, endpoint])

    if (loading) return <h2>Loading...</h2>
    if (error) return <h2>Error: {error}</h2>

    if (films.length === 0) {
        return (
            <div className="no-results">
                <h2 style={{ margin: '0 0 20px' }}>No {type === 'films' ? 'films' : 'series'} found</h2>
                {endpoint === 'search' ? (
                    <p>We couldn't find any {type === 'films' ? 'films' : 'TV series'} matching "{searchQuery}"</p>
                ) : (
                    <p>No {type === 'films' ? 'films' : 'TV series'} available with current filters</p>
                )}
            </div>
        )
    }

    return (
        <>
            <FilmGrid films={films} />
            <Pagination
                currentPage={currentPage ?? '1'}
                pageCount={avaliablePageCount}
                url={getPaginationBaseUrl()} />
        </>
    )
}