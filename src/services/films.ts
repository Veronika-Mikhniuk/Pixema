import { apiConfig, apiEndpoints, defaultParams } from '@/config/api'
import { IRequestFilmsParams, IRequestFilmParams, IRequestResponse } from '@/types/FilmsServiceTypes'

export const requestFilms = async ({ type = 'films', endpoint = 'trending', ...params }: IRequestFilmsParams = {}): Promise<IRequestResponse> => {
    try {
        const queryParams = new URLSearchParams(
            Object.fromEntries(
                Object.entries({
                    ...defaultParams,
                    ...params
                }).map(([key, value]) => [key, String(value)])
            )
        ).toString()

        const baseEndpoint = type === 'films' ? apiEndpoints.films : apiEndpoints.series
        const advancedEndpoint = baseEndpoint[endpoint]
        const url = `${apiConfig.baseUrl}${advancedEndpoint}?${queryParams}`

        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${apiConfig.token}`,
                'accept': 'application/json'
            }
        })

        if (!response.ok) {
            throw new Error('Failed to fetch films')
        }

        const data = await response.json()
        return data

    } catch (error) {
        console.log(error)
        if (error instanceof Error) {
            return {
                hasError: true,
                message: error.message
            }
        }
        return {
            hasError: true,
            message: 'Unknown error'
        }
    }
}

export const requestFilm = async ({ id, type = 'films' }: IRequestFilmParams = {}): Promise<IRequestResponse> => {
    try {
        const endpoint = type === 'films' ? apiEndpoints.films.details : apiEndpoints.series.details
        const url = `${apiConfig.baseUrl}${endpoint}/${id}?language=en-US`

        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${apiConfig.token}`,
                'accept': 'application/json'
            }
        })

        if (!response.ok) {
            throw new Error('Failed to fetch films')
        }

        const data = await response.json()
        return data

    } catch (error) {
        console.log(error)
        if (error instanceof Error) {
            return {
                hasError: true,
                message: error.message
            }
        }
        return {
            hasError: true,
            message: 'Unknown error'
        }
    }
}

export const requestGenres = async (): Promise<IRequestResponse> => {
    try {
        const url = `${apiConfig.baseUrl}/genre/movie/list?language=en`

        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${apiConfig.token}`,
                'accept': 'application/json'
            }
        })

        if (!response.ok) {
            throw new Error('Failed to fetch genres')
        }

        const data = await response.json()
        return data

    } catch (error) {
        console.log(error)
        if (error instanceof Error) {
            return {
                hasError: true,
                message: error.message
            }
        }
        return {
            hasError: true,
            message: 'Unknown error'
        }
    }
}