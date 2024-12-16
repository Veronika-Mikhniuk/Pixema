import { FilmList } from "@/components/FilmList"

export function Series({ trending, popular, topRated, upcoming, search }) {
    const type = 'series'

    if (trending) return <FilmList type={type} endpoint='trending' />
    if (popular) return <FilmList type={type} endpoint='popular' />
    if (topRated) return <FilmList type={type} endpoint='topRated' />
    if (upcoming) return <FilmList type={type} endpoint='upcoming' />
    if (search) return <FilmList type={type} endpoint='search' />

    return <FilmList type={type} endpoint='all' />
}