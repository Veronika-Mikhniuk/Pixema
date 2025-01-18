import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFavoriteIds, fetchFilm } from '@/redux/films-slice'
import { fetchAddToFavorites } from '@/redux/userActions-slice'
import { baseImgUrl } from '@/config/api'
import { Title } from '@/components/Title'
import { Rating } from '@/components/Rating'
import { icons } from '@/assets/icons'
import { formatDate } from '@/utils/formatDate'
import noImage from '@/assets/backgrounds/no-image-background.jpg'
import { RootState } from '@/redux/store'
import { AppDispatch } from '@/redux/store'
import { AuthModal } from '@/components/AuthModal'
import '@/styles/filmDetails.scss'

export function FilmDetails({ type }: { type: 'films' | 'series' }) {
    const [isHovered, setIsHovered] = useState(false)
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
    const navigate = useNavigate()

    const { id } = useParams()
    const dispatch = useDispatch<AppDispatch>()
    const { currentFilm, loading, error, favoriteIds } = useSelector((state: RootState) => state.films)
    const { sessionId } = useSelector((state: RootState) => state.auth)

    const isFavorite = currentFilm ? favoriteIds.includes(currentFilm.id) : false

    useEffect(() => {
        if (sessionId) {
            dispatch(fetchFavoriteIds(type))
        }

        dispatch(fetchFilm({ type, id }))
    }, [id, dispatch, type, sessionId])

    if (loading) return <h2>Loading...</h2>
    if (error) return <h2>Error: {error}</h2>
    if (!currentFilm) return null

    const handleClickFavoriteButton = () => {
        if (!sessionId) {
            setIsAuthModalOpen(true)
            return
        }

        dispatch(fetchAddToFavorites({
            mediaId: currentFilm.id,
            mediaType: type === 'films' ? 'movie' : 'tv',
            favorite: !isFavorite
        })).then((result) => {
            // After succesfull adding/removing - update favourite list
            if (result.meta.requestStatus === 'fulfilled') {
                dispatch(fetchFavoriteIds(type))
            }
        })
    }

    return (
        <>
            <div className="film-details">
                <div className="film-details__poster">
                    <img
                        className="film-details__image"
                        src={currentFilm.poster_path
                            ? `${baseImgUrl}w500${currentFilm.poster_path}`
                            : noImage
                        }
                        alt={currentFilm.title || currentFilm.name}
                    />
                    <button
                        className={`film-details__favorite-btn ${isFavorite ? 'active' : ''}`}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        onClick={handleClickFavoriteButton}
                    >
                        <span>
                            <img
                                src={isFavorite
                                    ? icons.nav.favourite.active
                                    : (isHovered ? icons.nav.favourite.active : icons.nav.favourite.default)}
                                alt="favorites"
                            />
                            {isFavorite ? 'Remove from Favourites' : 'Add to Favourites'}
                        </span>
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
                        {currentFilm.runtime !== undefined && currentFilm.runtime > 0 && (
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

                        {(currentFilm.release_date || currentFilm.first_air_date) && (
                            <dl className="film-details__info-item">
                                <dt>Release Date</dt>
                                <dd>
                                    {formatDate(currentFilm.release_date || currentFilm.first_air_date as string)}
                                </dd>
                            </dl>
                        )}

                        {currentFilm.production_countries && currentFilm.production_countries.length > 0 && (
                            <dl className="film-details__info-item">
                                <dt>Countries</dt>
                                <dd>{currentFilm.production_countries.map(country => country.name).join(', ')}</dd>
                            </dl>
                        )}

                        {currentFilm.production_companies && currentFilm.production_companies.length > 0 && (
                            <dl className="film-details__info-item">
                                <dt>Production</dt>
                                <dd>{currentFilm.production_companies.map(company => company.name).join(', ')}</dd>
                            </dl>
                        )}
                    </div>
                </div>
            </div >

            <AuthModal
                isOpen={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
                onNavigateToAuth={() => navigate('/auth/sign-in')}
            />
        </>
    )
}