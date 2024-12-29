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
    [key: string]: string
}