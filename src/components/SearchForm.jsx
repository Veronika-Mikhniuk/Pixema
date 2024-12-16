import { useState, useEffect } from "react"
import { useNavigate, useParams, useLocation } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { setSearchQuery } from '@/redux/films-slice'
import filterIcon from '@/assets/icons/filter-button-icon.svg'
import '@/styles/searchForm.scss'

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
        navigate(`/films/search/${encodedQuery}/1`)
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
            <button type="button" className="search-form__filter">
                <img src={filterIcon} alt="icon" />
            </button>
        </form>
    )
}