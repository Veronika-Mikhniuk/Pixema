import { useForm } from 'react-hook-form';
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { SortByFilter } from '@/components/FilterSortBy'
import { CountryFilter } from '@/components/FilterCountry'
import { GenresFilter } from '@/components/FilterGenres'
import { RangeFilter } from '@/components/FilterRange'
import { fetchFilms } from '@/redux/films-slice'
import { setActiveFilters, clearFilters } from '@/redux/films-slice'
import { prepareFilterParams } from '@/utils/prepareFilterParams'
import { createFilterValidation } from '@/utils/filterValidation'
import '@/styles/filterPanel.scss'

export function FilterPanel({ isOpen, onClose }) {
    const panelRef = useRef(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const { activeFilters } = useSelector(state => state.films)
    const { genres } = useSelector(state => state.films)

    const { register, handleSubmit, reset, formState: { errors, isValid }, watch, clearErrors } = useForm({ // methods from useForms react-hook-form
        mode: 'onBlur', // Validation on missing focus
    })

    const ratingFrom = watch('ratingFrom')
    const ratingTo = watch('ratingTo')
    const yearFrom = watch('yearFrom')
    const yearTo = watch('yearTo')
    const validation = createFilterValidation(watch)

    // If form fully valid - clear all errors
    useEffect(() => {
        if (isValid) {
            clearErrors()
        }
    }, [isValid, clearErrors])

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
                        ✖
                    </button>
                </div>

                <form
                    className="filter-panel__form"
                    onSubmit={handleSubmit(onSubmit)}
                    onReset={handleReset}
                >
                    <div className="filter-panel__content">
                        <SortByFilter register={register} />
                        <GenresFilter register={register} genres={genres} />

                        <RangeFilter
                            label="Year"
                            registerFrom={register('yearFrom', validation.yearFrom)}
                            registerTo={register('yearTo', validation.yearTo)}
                            errors={errors}
                        />

                        <RangeFilter
                            label="Rating"
                            registerFrom={register('ratingFrom', validation.ratingFrom)}
                            registerTo={register('ratingTo', validation.ratingTo)}
                            errors={errors}
                            step="0.1"
                        />

                        <CountryFilter register={register} />
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