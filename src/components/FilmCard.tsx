import { useSelector, useDispatch } from 'react-redux'
import { useLocation, NavLink } from 'react-router-dom'
import { baseImgUrl } from '@/config/api'
import { Title } from '@/components/Title'
import { Rating } from '@/components/Rating'
import noImage from '@/assets/backgrounds/no-image-background.jpg'
import { IFilm } from '@/types/IFilm'
import { RootState } from '@/redux/store'
import { icons } from '@/assets/icons'
import { fetchAddToFavorites } from '@/redux/userActions-slice'
import { AppDispatch } from '@/redux/store'
import { addToFavoriteIds, removeFromFavoriteIds } from '@/redux/films-slice'
import '@/styles/filmCard.scss'

export function FilmCard({ film }: { film: IFilm }) {
    const { genres, favoriteIds, favoritesLoading } = useSelector((state: RootState) => state.films)
    const { sessionId } = useSelector((state: RootState) => state.auth)
    const location = useLocation()
    const dispatch = useDispatch<AppDispatch>()
    const type = location.pathname.includes('films') ? 'films' : 'series'

    const getGenreNames = (): string => {
        return film.genre_ids
            ?.map(id => genres.find(genre => genre.id === id)?.name)
            .filter(Boolean)
            .join(' · ') || ''
    }

    const isFavorite = favoriteIds.includes(film.id)

    const handleFavoriteClick = () => {
        const newFavoriteState = !isFavorite

        dispatch(fetchAddToFavorites({
            mediaId: film.id,
            mediaType: type === 'films' ? 'movie' : 'tv',
            favorite: newFavoriteState
        })).then((action) => {
            if (action.meta.requestStatus === 'fulfilled') {
                if (newFavoriteState) {
                    dispatch(addToFavoriteIds(film.id))
                } else {
                    dispatch(removeFromFavoriteIds(film.id))
                }
            }
        })
    }

    return (
        <NavLink to={`/${type}/details/${film.id}`} className="film-card" state={{ from: location.pathname }}>
            <div className="film-card__poster-container">
                <img
                    src={film.poster_path
                        ? `${baseImgUrl}w500${film.poster_path}`
                        : noImage
                    }
                    alt={film.title}
                    className="film-card__poster"
                />
                {film.vote_average > 0 && (
                    <span className="film-card__rating">
                        <Rating value={film.vote_average} />
                    </span>
                )}

                {sessionId && (<button
                    className={`film-card__favorite ${isFavorite ? 'active' : ''}`}
                    onClick={(e) => {
                        e.preventDefault()  // Prevent working of NavLink
                        handleFavoriteClick()
                    }}
                    disabled={favoritesLoading}
                >
                    <img
                        src={isFavorite ? icons.nav.favourite.active : icons.nav.favourite.default}
                        alt={isFavorite ? "Remove from favorites" : "Add to favorites"}
                    />
                </button>
                )}
            </div>
            <Title tertiary>{film.title || film.name}</Title>
            <p className="film-card__genres">
                {getGenreNames()}
            </p>
        </NavLink >
    )
}