import { baseImgUrl } from '@/config/api'
import { Title } from './Title'
import '@/styles/filmCard.scss'

export function FilmCard({ film }) {
    const getRatingValue = (rating) => {
        return rating ? rating.toFixed(1) : 'no rating';
    }

    const getColorByRating = (rating) => {
        if (rating >= 7) return 'high'
        if (rating >= 5) return 'medium'
        return 'low'
    }

    return (
        <div className="film-card">
            <div className="film-card__poster-container">
                <img
                    src={`${baseImgUrl}w500${film.poster_path}`}
                    alt={film.title}
                    className="film-card__poster"
                />
                {film.vote_average > 0 && (
                    <span className={`film-card__rating film-card__rating_${getColorByRating(film.vote_average)}`}>
                        {getRatingValue(film.vote_average)}
                    </span>
                )}
            </div>
            <Title tertiary>{film.title || film.name}</Title>
            <p className="film-card__genres">
                {film.genre_ids?.join(' · ')}
            </p>
        </div>
    )
}