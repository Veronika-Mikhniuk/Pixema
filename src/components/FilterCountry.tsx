import { UseFormRegister } from 'react-hook-form'
import { IFilterFormData } from '@/types/IFilterParams'
import '@/styles/filterSelect.scss'

export function CountryFilter({ register }: { register: UseFormRegister<IFilterFormData> }) {
    return (
        <div className="filter-group">
            <label>Country</label>
            <select {...register('country')}>
                <option value="">All countries</option>
                <option value="US">United States</option>
                <option value="GB">United Kingdom</option>
                <option value="FR">France</option>
                <option value="DE">Germany</option>
            </select>
        </div>
    )
}