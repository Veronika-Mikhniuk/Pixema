import '@/styles/rating.scss'

export function Rating({ value, size = 'small' }) {
    const getRatingClass = (rating) => {
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