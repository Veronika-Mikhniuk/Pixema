export interface IFilmDetails {
    id: number
    title?: string
    name?: string
    poster_path?: string
    vote_average: number
    genres?: { id: number; name: string }[]
    runtime?: number
    overview?: string
    status?: string
    release_date?: string
    first_air_date?: string
    production_countries?: { name: string }[]
    production_companies?: { name: string }[]
}