import { apiConfig, apiEndpoints } from '@/config/api'

export const requestAuthToken = async () => {
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
        return {
            hasError: true,
            message: error.message,
        }
    }
}

export const requestValidateTokenWithLogin = async (username, password, requestToken) => {
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
        return {
            hasError: true,
            message: error.message,
        }
    }
}

export const requestCreateSession = async (requestToken) => {
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
        return {
            hasError: true,
            message: error.message,
        }
    }
}