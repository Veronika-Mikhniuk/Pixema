import { UseFormRegister } from 'react-hook-form'
import { IFilterFormValues } from '@/types/IFilterFormValues'
import { IGenre } from '@/types/IGenre'
import '@/styles/filterGenres.scss'

export function GenresFilter({
    register,
    genres
}: {
    register: UseFormRegister<IFilterFormValues>;
    genres: IGenre[];
}) {
    return (
        <div className="filter-group">
            <label>Genres</label>
            <div className="filter-genres">
                {genres.map(genre => (
                    <label key={genre.id} className="filter-genres__item">
                        <input
                            type="checkbox"
                            {...register('genres')}
                            value={genre.id}
                        />
                        <span className="custom-checkbox"></span>
                        {genre.name}
                    </label>
                ))}
            </div>
        </div>
    )
}