import { apiConfig, apiEndpoints } from '@/config/api'

interface IAuthTokenResponse {
    success?: boolean;
    request_token?: string;
    hasError?: boolean;
    message?: string;
}

interface ISessionResponse {
    success?: boolean;
    session_id?: string;
    hasError?: boolean;
    message?: string;
}

export const requestAuthToken = async (): Promise<IAuthTokenResponse> => {
    try {
        const url = `${apiConfig.baseUrl}${apiEndpoints.auth.requestToken}`

        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${apiConfig.token}`
            }
        })

        if (!response.ok) {
            throw new Error('Failed to fetch token')
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
            message: 'An unknown error occurred'
        }
    }
}

export const requestValidateTokenWithLogin = async (
    username: string,
    password: string,
    requestToken: string
): Promise<IAuthTokenResponse> => {
    try {
        const url = `${apiConfig.baseUrl}${apiEndpoints.auth.validateWithLogin}`

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiConfig.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password,
                request_token: requestToken
            })
        })

        if (!response.ok) {
            if (response.status === 401 || response.status === 404) {
                return {
                    hasError: true,
                    message: 'User not found. Please check your credentials and make sure you have been registered.'
                }
            }
            throw new Error('SignIn failed. Please try again later.')
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
            message: 'An unknown error occurred'
        }
    }
}

export const requestCreateSession = async (requestToken: string): Promise<ISessionResponse> => {
    try {
        const url = `${apiConfig.baseUrl}${apiEndpoints.auth.createSession}`

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiConfig.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                request_token: requestToken
            })
        })

        if (!response.ok) {
            throw new Error('SignIn failed. Please try again later.')
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
            message: 'An unknown error occurred'
        }
    }
}