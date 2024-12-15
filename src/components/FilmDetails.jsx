import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFilm } from '@/redux/films-slice'
import { baseImgUrl } from '@/config/api'
import { Title } from '@/components/Title'
import { Rating } from '@/components/Rating'
import { icons } from '@/assets/icons'
import { formatDate } from '@/utils/formatDate'
import '@/styles/filmDetails.scss'

export function FilmDetails({ type }) {
    const [isHovered, setIsHovered] = useState(false)

    const { id } = useParams()
    const dispatch = useDispatch()
    const { currentFilm, loading, error } = useSelector(state => state.films)

    useEffect(() => {
        dispatch(fetchFilm({ type, id }))
    }, [id, dispatch])

    if (loading) return <h2>Loading...</h2>
    if (error) return <h2>Error: {error}</h2>
    if (!currentFilm) return null

    return (
        <div className="film-details">
            <div className="film-details__poster">
                <img
                    src={`${baseImgUrl}w500${currentFilm.poster_path}`}
                    alt={currentFilm.title || currentFilm.name}
                />
                <button
                    className="film-details__favorite-btn"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <img src={isHovered ? icons.nav.favourite.active : icons.nav.favourite.default} alt="Add to favorites" />
                    Add to Favorites
                </button>
            </div>

            <div className="film-details__content">
                <div className="film-details__genres">
                    {currentFilm.genres?.map(genre => genre.name).join(' · ')}
                </div>

                <Title>
                    {currentFilm.title || currentFilm.name}
                </Title>

                <div className="film-details__meta">
                    {currentFilm.vote_average > 0 &&
                        <div className={`film-details__rating `}>
                            <Rating value={currentFilm.vote_average} size='large' />

                        </div>
                    }
                    {currentFilm.runtime > 0 && (
                        <div className="film-details__runtime">
                            {currentFilm.runtime} min
                        </div>
                    )}
                </div>

                {currentFilm.overview && (
                    <p className="film-details__overview">{currentFilm.overview}</p>
                )}

                <div className="film-details__info">
                    <dl className="film-details__info-item">
                        <dt>Status</dt>
                        <dd>{currentFilm.status}</dd>
                    </dl>

                    <dl className="film-details__info-item">
                        <dt>Release Date</dt>
                        <dd>{formatDate(currentFilm.release_date || currentFilm.first_air_date)}</dd>
                    </dl>

                    {currentFilm.production_countries?.length > 0 && (
                        <dl className="film-details__info-item">
                            <dt>Countries</dt>
                            <dd>{currentFilm.production_countries.map(country => country.name).join(', ')}</dd>
                        </dl>
                    )}

                    {currentFilm.production_companies?.length > 0 && (
                        <dl className="film-details__info-item">
                            <dt>Production</dt>
                            <dd>{currentFilm.production_companies.map(company => company.name).join(', ')}</dd>
                        </dl>
                    )}
                </div>
            </div>
        </div >
    )
}