export interface IAddToFavoritesParams {
    mediaId: number
    mediaType: 'movie' | 'tv'
    favorite: boolean
}

export interface IAddToFavoritesResponse {
    success?: boolean
    status_code?: number
    status_message?: string
    hasError?: boolean
    message?: string
}