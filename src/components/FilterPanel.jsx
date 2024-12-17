import { useForm } from 'react-hook-form';
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchFilms } from '@/redux/films-slice'
import { setActiveFilters, clearFilters } from '@/redux/films-slice'
import '@/styles/filterPanel.scss'

export function FilterPanel({ isOpen, onClose }) {
    const panelRef = useRef(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const activeFilters = useSelector(state => state.films.activeFilters)

    const { register, handleSubmit, reset } = useForm() // methods from useForms react-hook-form

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (panelRef.current && !panelRef.current.contains(event.target)) {
                onClose()
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside)
            return () => {
                document.removeEventListener('mousedown', handleClickOutside)
            }
        }
    }, [isOpen, onClose])

    if (!isOpen) return null

    const onSubmit = (data) => {
        // Preparing params for backend request
        const apiParams = {
            sort_by: data.sortBy,
            'primary_release_date.gte': data.yearFrom ? `${data.yearFrom}-01-01` : '',
            'primary_release_date.lte': data.yearTo ? `${data.yearTo}-12-31` : '',
            'vote_average.gte': data.ratingFrom || '',
            'vote_average.lte': data.ratingTo || '',
            with_origin_country: data.country || ''
        }

        // Cleaning empty values
        const cleanApiParams = Object.fromEntries(
            Object.entries(apiParams).filter(([_, value]) => value !== '')
        )

        // save filter data to redux
        dispatch(setActiveFilters(cleanApiParams))


        const searchParams = new URLSearchParams(cleanApiParams).toString()
        const isFilmsRoute = location.pathname.includes('/films/')
        const routeType = isFilmsRoute ? 'films' : 'series'
        navigate(`/${routeType}/1?${searchParams}`)

        dispatch(fetchFilms({
            type: routeType,
            endpoint: 'all',
            ...cleanApiParams
        }))

        onClose()
    }

    const handleReset = () => {
        reset()

        // clear filter data in redux
        dispatch(clearFilters())

        const isFilmsRoute = location.pathname.includes('/films/')
        const routeType = isFilmsRoute ? 'films' : 'series'
        navigate(`/${routeType}/1`)

        dispatch(fetchFilms({
            type: routeType,
            endpoint: 'trending'
        }))

        onClose()
    }

    return (
        <div className="filter-overlay">
            <div className="filter-panel" ref={panelRef}>
                <div className="filter-panel__header">
                    <h2>Filters</h2>
                    <button
                        className="filter-panel__close"
                        onClick={onClose}
                        aria-label="Close filters"
                    >
                        x
                    </button>
                </div>

                <form
                    className="filter-panel__form"
                    onSubmit={handleSubmit(onSubmit)}
                    onReset={handleReset}
                >
                    <div className="filter-panel__content">
                        <div className="filter-group">
                            <label>Sort by</label>
                            <select {...register('sortBy')}>
                                <option value="popularity.desc">Popularity (High to Low)</option>
                                <option value="popularity.asc">Popularity (Low to High)</option>
                                <option value="vote_average.desc">Rating (High to Low)</option>
                                <option value="vote_average.asc">Rating (Low to High)</option>
                            </select>
                        </div>

                        <div className="filter-group">
                            <label>Year</label>
                            <div className="filter-range">
                                <input
                                    type="number"
                                    {...register('yearFrom')}
                                    placeholder="From"
                                    min="1900"
                                    max={new Date().getFullYear()}
                                />
                                <input
                                    type="number"
                                    {...register('yearTo')}
                                    placeholder="To"
                                    min="1900"
                                    max={new Date().getFullYear()}
                                />
                            </div>
                        </div>

                        <div className="filter-group">
                            <label>Rating</label>
                            <div className="filter-range">
                                <input
                                    type="number"
                                    {...register('ratingFrom')}
                                    placeholder="From"
                                    min="0"
                                    max="10"
                                    step="0.1"
                                />
                                <input
                                    type="number"
                                    {...register('ratingTo')}
                                    placeholder="To"
                                    min="0"
                                    max="10"
                                    step="0.1"
                                />
                            </div>
                        </div>

                        <div className="filter-group">
                            <label>Country</label>
                            <select {...register('country')}>
                                <option value="">All countries</option>
                                <option value="US">United States</option>
                                <option value="GB">United Kingdom</option>
                                <option value="FR">France</option>
                                <option value="DE">Germany</option>
                            </select>
                        </div>
                    </div>

                    <div className="filter-panel__actions">
                        <button
                            type="reset"
                            className="filter-panel__button filter-panel__button_clear"
                        >
                            Clear
                        </button>
                        <button
                            type="submit"
                            className="filter-panel__button filter-panel__button_apply"
                        >
                            Search
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}