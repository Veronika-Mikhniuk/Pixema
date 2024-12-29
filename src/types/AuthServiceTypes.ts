export interface IAuthTokenResponse {
    success?: boolean
    request_token?: string
    hasError?: boolean
    message?: string
}

export interface ISessionResponse {
    success?: boolean
    session_id?: string
    hasError?: boolean
    message?: string
}

export interface IAccountDetailsResponse {
    id?: number
    username?: string
    name?: string
    language?: string
    country?: string
    hasError?: boolean
    message?: string
}