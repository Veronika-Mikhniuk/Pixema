import { FilmCard } from '@/components/FilmCard'
import { IFilm } from '@/types/IFilm'

export function FilmGrid({ films }: { films: IFilm[] }) {
    return (
        <div className="film-grid"
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',
                gap: '40px',
                padding: '20px 5px 0'
            }}
        >
            {films.map(film => (
                <FilmCard key={film.id} film={film} />
            ))}
        </div>
    )
}