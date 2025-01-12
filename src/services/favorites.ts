import { apiConfig, apiEndpoints } from '@/config/api'
import { IAddToFavoritesParams, IAddToFavoritesResponse } from '@/types/FavoritesServiceTypes'

export const requestAddToFavorites = async (
    params: IAddToFavoritesParams & { accountId: string }
): Promise<IAddToFavoritesResponse> => {
    try {
        const url = `${apiConfig.baseUrl}${apiEndpoints.account.favorites.add.replace(
            '{account_id}',
            params.accountId
        )}`

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiConfig.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                media_type: params.mediaType,
                media_id: params.mediaId,
                favorite: params.favorite
            })
        })

        if (!response.ok) {
            throw new Error('Failed to add to favorites')
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