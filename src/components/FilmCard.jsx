import { baseImgUrl } from '@/config/api'
import { Title } from './Title'
import '@/styles/filmCard.scss'

export function FilmCard({ film }) {
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
                <span className={`film-card__rating film-card__rating_${getColorByRating(film.vote_average)}`}>
                    {film.vote_average.toFixed(1)}
                </span>
            </div>
            <Title tertiary>{film.title || film.name}</Title>
            <p className="film-card__genres">
                {film.genre_ids.join(' · ')}
            </p>
        </div>
    )
}