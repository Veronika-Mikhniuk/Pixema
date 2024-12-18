export interface IFilterFormData {
    sortBy: string
    yearFrom?: string
    yearTo?: string
    ratingFrom?: string
    ratingTo?: string
    country?: string
    genres?: string[]
}

export interface IApiParams {
    sort_by: string
    'vote_average.gte'?: string
    'vote_average.lte'?: string
    'primary_release_date.gte'?: string
    'primary_release_date.lte'?: string
    'first_air_date.gte'?: string
    'first_air_date.lte'?: string
    'with_origin_country'?: string
    with_genres?: string
}