import { useState, useEffect } from 'react'
import { useNavigate, useParams, useLocation } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { setSearchQuery } from '@/redux/films-slice'
import { FilterPanel } from '@/components/FilterPanel'
import filterIcon from '@/assets/icons/filter-button-icon.svg'
import '@/styles/searchForm.scss'

export function SearchForm() {
    const { query: queryParam } = useParams() // for saving queryParam when reloading page
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()

    const [isFilterOpen, setIsFilterOpen] = useState(false)
    const [query, setQuery] = useState(() => {
        if (location.pathname.includes('/search/')) {
            const searchQuery = decodeURIComponent(queryParam || '')
            dispatch(setSearchQuery(searchQuery))
            return searchQuery
        }
        return ''
    })

    useEffect(() => {
        // clear input if pathname don't include certain path
        // /films/details/ important cause the path is cleared when the user goes to the film page from the search page, then an error appears when the user returns
        if (!location.pathname.includes('/search/') && !location.pathname.includes('/films/details/')) {
            setQuery('')
            dispatch(setSearchQuery(''))
        }
    }, [location.pathname])

    const handleFilterClick = () => {
        setIsFilterOpen(true)
    }

    const handleChange = (event) => {
        setQuery(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (!query.trim()) return

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
        <>
            <form className="search-form" onSubmit={handleSubmit}>
                <input
                    type="search"
                    className="search-form__input"
                    placeholder="Search films"
                    value={query}
                    onChange={handleChange}
                    onInput={handleClear}
                />
                <button
                    type="button"
                    className="search-form__filter"
                    onClick={handleFilterClick}
                    disabled={location.pathname.includes('/search')}
                >
                    <img src={filterIcon} alt="icon" />
                </button>
            </form>

            <FilterPanel
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
            />
        </>
    )
}