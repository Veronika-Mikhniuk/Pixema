import { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { useNavigate, useParams, useLocation } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { setSearchQuery, clearFilters } from '@/redux/films-slice'
import { FilterPanel } from '@/components/FilterPanel'
import { RootState } from '@/redux/store'
import { AppDispatch } from '@/redux/store'
import { icons } from '@/assets/icons'
import '@/styles/searchForm.scss'

export function SearchForm() {
    const { query: queryParam } = useParams() // for saving queryParam when reloading page
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const location = useLocation()
    const { activeFilters } = useSelector((state: RootState) => state.films)

    const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false)
    const [query, setQuery] = useState<string>(() => {
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
        if (!location.pathname.includes('/search/') && !location.pathname.includes('/films/details/') && !location.pathname.includes('/series/details/')) {
            setQuery('')
            dispatch(setSearchQuery(''))
        }
    }, [location.pathname])

    const handleFilterClick = (): void => {
        setIsFilterOpen(true)
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setQuery(event.target.value)
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault()
        if (!query.trim()) return

        dispatch(setSearchQuery(query))
        dispatch(clearFilters())
        const encodedQuery = encodeURIComponent(query)
        navigate(`/films/search/${encodedQuery}/1`)
    }

    const handleClear = (event: FormEvent<HTMLInputElement>): void => {
        if (!(event.target as HTMLInputElement).value) {
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
                    <img src={activeFilters ? icons.searchFilter.active : icons.searchFilter.default} alt="icon" />
                </button>
            </form>

            <FilterPanel
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
            />
        </>
    )
}