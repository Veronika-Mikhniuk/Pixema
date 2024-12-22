import { UseFormRegisterReturn } from 'react-hook-form'
import '@/styles/filterRange.scss'

interface IRangeFilterProps {
    label: string
    registerFrom: UseFormRegisterReturn
    registerTo: UseFormRegisterReturn
    errors: {
        [key: string]: { message?: string }
    }
    step?: string | number
}

export function RangeFilter({
    label,
    registerFrom,
    registerTo,
    errors,
    step = '1'
}: IRangeFilterProps) {
    return (
        <div className="filter-group">
            <label>{label}</label>
            <div className="filter-range">
                <div>
                    <input
                        type="number"
                        {...registerFrom}
                        placeholder="From"
                        step={step}
                        className={errors[registerFrom.name] ? 'error' : ''}
                    />
                    {errors[registerFrom.name] && (
                        <span className="error-message">{errors[registerFrom.name].message}</span>
                    )}
                </div>
                <div>
                    <input
                        type="number"
                        {...registerTo}
                        placeholder="To"
                        step={step}
                        className={errors[registerTo.name] ? 'error' : ''}
                    />
                    {errors[registerTo.name] && (
                        <span className="error-message">{errors[registerTo.name].message}</span>
                    )}
                </div>
            </div>
        </div>
    )
}