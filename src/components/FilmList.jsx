import { useState, useEffect } from 'react'
import { useLocation, useParams, useSearchParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { fetchFilms } from '@/redux/films-slice'
import { maxPageLimit } from '@/config/api'
import { FilmGrid } from './FilmsGrid'
import { Pagination } from '@/components/Pagination'
import { fetchGenres } from '@/redux/films-slice.js'

export function FilmList({ type, endpoint }) {
    const { currentPage } = useParams()
    const dispatch = useDispatch()
    const location = useLocation()
    const [searchParams] = useSearchParams() // take queryparams from url
    const { list: films, loading, error, pageCount, searchQuery } = useSelector(state => state.films)

    const avaliablePageCount = Math.min(pageCount, maxPageLimit)

    const getPaginationBaseUrl = () => {
        if (endpoint === 'search') {
            return `/${type}/search/${searchQuery}`
        }

        if (endpoint === 'trending' || endpoint === 'all') {
            return `/${type}`
        }
        return `/${endpoint}/${type}`
    }

    useEffect(() => {
        dispatch(fetchGenres())
        const filterParams = Object.fromEntries(searchParams) // transform queryparams from url into object

        if (endpoint === 'search' && searchQuery) {
            dispatch(fetchFilms({ type, endpoint, query: searchQuery, page: currentPage }))
        } else {
            dispatch(fetchFilms({ type, endpoint, ...filterParams, page: currentPage }))
        }

    }, [currentPage, searchQuery, searchParams, dispatch, endpoint])

    if (loading) return <h2>Loading...</h2>
    if (error) return <h2>Error: {error}</h2>

    if (endpoint === 'search' && films.length === 0) {
        return (
            <div className="no-results">
                <h2>No {type === 'films' ? 'films' : 'series'} found</h2>
                <p>We couldn't find any {type === 'films' ? 'films' : 'TV series'} matching "{searchQuery}"</p>
            </div>
        )
    }

    return (
        <>
            <FilmGrid films={films} />
            <Pagination
                currentPage={currentPage}
                pageCount={avaliablePageCount}
                url={getPaginationBaseUrl()} />
        </>
    )
}