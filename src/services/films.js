import { apiConfig, filmsEndpoints, defaultParams } from '@/config/api'

export const requestFilms = async ({ type = 'films', endpoint = 'trending', ...params } = {}) => {
    try {
        const queryParams = new URLSearchParams({
            ...defaultParams,
            ...params
        }).toString()

        const baseEndpoint = type === 'films' ? filmsEndpoints.films : filmsEndpoints.series
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
        return {
            hasError: true,
            message: error.message,
        }
    }
}

export const requestGenres = async () => {
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
        return {
            hasError: true,
            message: error.message,
        }
    }
}