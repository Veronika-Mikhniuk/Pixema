import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFilms } from '@/redux/films-slice'
import { FilmGrid } from './FilmsGrid'

export function FilmList() {
    const dispatch = useDispatch()
    const { list: films, loading, error } = useSelector(state => state.films)

    useEffect(() => {
        dispatch(fetchFilms())
    }, [])


    if (loading) return <h2>Loading...</h2>
    if (error) return <h2>Error: {error}</h2>

    return (
        <div>
            <h1>Films:</h1>
            <FilmGrid films={films} />
        </div>
    )
}