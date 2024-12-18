import { useForm } from 'react-hook-form';
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { fetchFilms } from '@/redux/films-slice'
import { setActiveFilters, clearFilters } from '@/redux/films-slice'
import { prepareFilterParams } from '@/utils/prepareFilterParams'
import '@/styles/filterPanel.scss'

export function FilterPanel({ isOpen, onClose }) {
    const panelRef = useRef(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const { activeFilters } = useSelector(state => state.films)
    const { genres } = useSelector(state => state.films)

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

        if (isOpen) {
            dispatch(fetchGenres())
        }

        if (!activeFilters) reset()
    }, [isOpen, onClose, activeFilters])

    if (!isOpen) return null

    const onSubmit = (data) => {
        const isFilmsRoute = location.pathname.includes('/films/')
        const routeType = isFilmsRoute ? 'films' : 'series'
        console.log(routeType)

        // Preparing params for backend request
        const apiParams = prepareFilterParams(data, routeType)

        // save filter data to redux
        dispatch(setActiveFilters(apiParams))


        const searchParams = new URLSearchParams(apiParams).toString()
        navigate(`/${routeType}/1?${searchParams}`)

        dispatch(fetchFilms({
            type: routeType,
            endpoint: 'all',
            ...apiParams
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
                        Х
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
                            <label>Genres</label>
                            <div className="filter-genres">
                                {genres.map(genre => (
                                    <label key={genre.id} className="filter-genres__item">
                                        <input
                                            type="checkbox"
                                            {...register('genres')}
                                            value={genre.id}
                                        />
                                        {genre.name}
                                    </label>
                                ))}
                            </div>
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