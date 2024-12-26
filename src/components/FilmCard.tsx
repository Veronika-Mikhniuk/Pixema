import { useSelector } from 'react-redux'
import { useLocation, NavLink } from 'react-router-dom'
import { baseImgUrl } from '@/config/api'
import { Title } from '@/components/Title'
import { Rating } from '@/components/Rating'
import noImage from '@/assets/backgrounds/no-image-background.jpg'
import { IFilm } from '@/types/IFilm'
import { IGenre } from '@/types/IGenre'
import { RootState } from '@/redux/store'
import '@/styles/filmCard.scss'

export function FilmCard({ film }: { film: IFilm }) {
    const { genres } = useSelector((state: RootState) => state.films) as { genres: IGenre[] }
    const location = useLocation()
    const type = location.pathname.includes('films') ? 'films' : 'series'


    const getGenreNames = (): string => {
        return film.genre_ids
            ?.map(id => genres.find(genre => genre.id === id)?.name)
            .filter(Boolean)
            .join(' · ') || ''
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
            </div>
            <Title tertiary>{film.title || film.name}</Title>
            <p className="film-card__genres">
                {getGenreNames()}
            </p>
        </NavLink >
    )
}