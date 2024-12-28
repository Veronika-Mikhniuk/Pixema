import { FilmDetails } from '@/components/FilmDetails'

interface IFilmProps {
    type: 'films' | 'series'
}

export function Film({ type }: IFilmProps) {
    return <FilmDetails type={type} />
}