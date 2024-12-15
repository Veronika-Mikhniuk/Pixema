import { useSelector } from 'react-redux'
import { useLocation, NavLink } from 'react-router-dom'
import { baseImgUrl } from '@/config/api'
import { Title } from '@/components/Title'
import { Rating } from '@/components/Rating'
import '@/styles/filmCard.scss'

export function FilmCard({ film }) {
    const { genres } = useSelector(state => state.films)
    const location = useLocation()
    const type = location.pathname.includes('films') ? 'films' : 'series'

    const getRatingValue = (rating) => {
        return rating ? rating.toFixed(1) : 'no rating';
    }

    const getGenreNames = () => {
        return film.genre_ids
            ?.map(id => genres.find(genre => genre.id === id)?.name)
            .filter(Boolean)
            .join(' · ')
    }

    const getColorByRating = (rating) => {
        if (rating >= 7) return 'high'
        if (rating >= 5) return 'medium'
        return 'low'
    }

    return (
        <NavLink to={`/${type}/details/${film.id}`} className="film-card">
            <div className="film-card__poster-container">
                <img
                    src={`${baseImgUrl}w500${film.poster_path}`}
                    alt={film.title}
                    className="film-card__poster"
                />
                {film.vote_average > 0 && (
                    <span className="film-card__rating">
                        <Rating value={film.vote_average} />
                    </span>
                )}
            </div>
            <Title tertiary>{film.title || film.name}</Title>
            <p className="film-card__genres">
                {getGenreNames()}
            </p>
        </NavLink >
    )
}