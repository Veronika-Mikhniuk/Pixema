import { useState, useEffect } from "react"
import { useNavigate, useParams, useLocation } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { setSearchQuery } from '@/redux/films-slice'

export function SearchForm() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const [query, setQuery] = useState('')

    useEffect(() => {
        setQuery('')
        navigate('/films/1')
    }, [])

    const handleChange = (event) => {
        setQuery(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        dispatch(setSearchQuery(query))
        const encodedQuery = encodeURIComponent(query)
        navigate(`/search/${encodedQuery}/films/1`)
    }

    const handleClear = (event) => {
        if (!event.target.value) {
            setQuery('')
            navigate('/films/1')
        }
    }

    return (
        <form className="search-form" onSubmit={handleSubmit}>
            <input
                type="search"
                className="search-form__input"
                placeholder="Search films"
                value={query}
                onChange={handleChange}
                onInput={handleClear}
            />
        </form>
    )
}