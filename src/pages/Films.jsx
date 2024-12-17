import { FilmList } from '@/components/FilmList'
import { useLocation } from 'react-router-dom'

export function Films({ trending, popular, topRated, upcoming, search }) {
    const type = 'films'

    const location = useLocation()
    const hasFilterParams = location.search.length > 0 // define if searchqueryParams exist in url

    if (hasFilterParams) {
        return <FilmList type={type} endpoint='all' />
    }

    if (trending) return <FilmList type={type} endpoint='trending' />
    if (popular) return <FilmList type={type} endpoint='popular' />
    if (topRated) return <FilmList type={type} endpoint='topRated' />
    if (upcoming) return <FilmList type={type} endpoint='upcoming' />
    if (search) return <FilmList type={type} endpoint='search' />

    return <FilmList type={type} endpoint='all' />
}