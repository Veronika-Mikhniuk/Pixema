import { useState, useEffect } from 'react'
import { useLocation, useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { fetchFilms } from '@/redux/films-slice'
import { maxPageLimit } from '@/config/api'
import { FilmGrid } from './FilmsGrid'
import { Pagination } from '@/components/Pagination'

export function FilmList() {
    const { currentPage } = useParams()
    const dispatch = useDispatch()
    const location = useLocation()
    const { list: films, loading, error, pageCount } = useSelector(state => state.films)

    const avaliablePageCount = Math.min(pageCount, maxPageLimit)

    useEffect(() => {
        if (location.pathname.includes('/films')) {
            dispatch(fetchFilms({ type: 'films', page: currentPage }))
        } else if (location.pathname.includes('/series')) {
            dispatch(fetchFilms({ type: 'series', page: currentPage }))
        }
        window.scrollTo(0, 0) // scrolling to the top of the page when pagination link was pressed
    }, [currentPage, dispatch])

    if (loading) return <h2>Loading...</h2>
    if (error) return <h2>Error: {error}</h2>

    return (
        <>
            <FilmGrid films={films} />
            <div className="nav-footer pt-3 pb-3">
                <Pagination
                    currentPage={currentPage}
                    pageCount={avaliablePageCount}
                    url={location.pathname.includes('/films') ? '/films' : '/series'} />
            </div>
        </>
    )
}