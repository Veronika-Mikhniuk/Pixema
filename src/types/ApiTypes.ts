export interface IApiConfig {
    baseUrl: string
    token: string
}

export interface IEndpoints {
    all: string
    trending: string
    popular: string
    topRated: string
    upcoming: string
    details: string
    search: string
    favourites: string
}

export interface IApiEndpoints {
    films: IEndpoints
    series: IEndpoints
    auth: {
        requestToken: string
        validateWithLogin: string
        createSession: string
        getAccount: string
    }
    account: {
        favorites: {
            add: string
        }
    }
}

export interface IDefaultParams {
    include_adult: boolean
    include_video: boolean
    language: string
}