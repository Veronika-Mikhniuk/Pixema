import { FilmCard } from '@/components/FilmCard'

export function FilmGrid({ films }) {
    return (
        <div className="film-grid"
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',
                gap: '40px'
            }}
        >
            {films.map(film => (
                <FilmCard key={film.id} film={film} />
            ))}
        </div>
    )
}