import { UseFormRegister } from 'react-hook-form'
import { IFilterFormValues } from '@/types/IFilterFormValues'
import '@/styles/filterSelect.scss'

export function SortByFilter({ register }: { register: UseFormRegister<IFilterFormValues> }) {
    return (
        <div className="filter-group">
            <label>Sort by</label>
            <select {...register('sortBy')}>
                <option value="popularity.desc">Popularity (High to Low)</option>
                <option value="popularity.asc">Popularity (Low to High)</option>
                <option value="vote_average.desc">Rating (High to Low)</option>
                <option value="vote_average.asc">Rating (Low to High)</option>
            </select>
        </div>
    )
}