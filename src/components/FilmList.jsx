import { useState, useEffect } from 'react'
import { useLocation, useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { fetchFilms } from '@/redux/films-slice'
import { maxPageLimit } from '@/config/api'
import { FilmGrid } from './FilmsGrid'
import { Pagination } from '@/components/Pagination'

export function FilmList({ type, endpoint }) {
    const { currentPage } = useParams()
    const dispatch = useDispatch()
    const location = useLocation()
    const { list: films, loading, error, pageCount } = useSelector(state => state.films)

    const avaliablePageCount = Math.min(pageCount, maxPageLimit)

    const getPaginationBaseUrl = () => {
        if (endpoint === 'all') {
            return `/${type}`
        }
        return `/${endpoint}/${type}`
    }

    useEffect(() => {
        dispatch(fetchFilms({ type, endpoint, page: currentPage }))

        window.scrollTo(0, 0) // scrolling to the top of the page when pagination link was pressed
    }, [currentPage, dispatch])

    if (loading) return <h2>Loading...</h2>
    if (error) return <h2>Error: {error}</h2>

    return (
        <>
            <FilmGrid films={films} />
            <div className="nav-footer">
                <Pagination
                    currentPage={currentPage}
                    pageCount={avaliablePageCount}
                    url={getPaginationBaseUrl()} />
            </div>
        </>
    )
}