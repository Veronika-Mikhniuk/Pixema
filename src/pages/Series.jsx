import { FilmList } from "@/components/FilmList"

export function Series({ trending, popular, topRated, upcoming }) {
    const type = 'series'

    if (trending) return <FilmList type={type} endpoint='trending' />
    if (popular) return <FilmList type={type} endpoint='popular' />
    if (topRated) return <FilmList type={type} endpoint='topRated' />
    if (upcoming) return <FilmList type={type} endpoint='upcoming' />

    return <FilmList type={type} endpoint='all' />
}