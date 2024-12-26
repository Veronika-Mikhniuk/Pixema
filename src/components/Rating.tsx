import '@/styles/rating.scss'

interface IRatingProps {
    value: number
    size?: 'small' | 'large'
}

type RatingType = 'high' | 'medium' | 'low'

export function Rating({ value, size = 'small' }: IRatingProps) {
    const getRatingClass = (rating: number): RatingType => {
        if (rating >= 7) return 'high'
        if (rating >= 5) return 'medium'
        return 'low'
    }

    const ratingClass = getRatingClass(value)
    const sizeClass = size === 'small' ? 'rating_small' : 'rating_large'

    return (
        <div className={`rating rating_${ratingClass} ${sizeClass}`}>
            {value.toFixed(1)}
        </div>
    )
}