import { apiConfig, filmsEndpoints, defaultParams } from '@/config/api'

export const requestFilms = async ({ type = 'films', ...params } = {}) => {
    try {
        const queryParams = new URLSearchParams({
            ...defaultParams,
            ...params
        }).toString()

        const baseEndpoint = type === 'films' ? filmsEndpoints.films.all : filmsEndpoints.tv.all
        const url = `${apiConfig.baseUrl}${baseEndpoint}?${queryParams}`

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