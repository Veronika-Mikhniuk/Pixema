import { useState, useEffect } from 'react'
import { useLocation } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { fetchFilms, fetchSeries } from '@/redux/films-slice'
import { FilmGrid } from './FilmsGrid'

export function FilmList() {
    const dispatch = useDispatch()
    const location = useLocation()
    const { list: films, loading, error } = useSelector(state => state.films)

    useEffect(() => {
        if (location.pathname === '/films') {
            dispatch(fetchFilms())
        } else if (location.pathname === '/series') {
            dispatch(fetchSeries())
        }
    }, [])


    if (loading) return <h2>Loading...</h2>
    if (error) return <h2>Error: {error}</h2>

    return (
        <FilmGrid films={films} />
    )
}