import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { requestAuthToken, requestValidateTokenWithLogin, requestCreateSession } from '@/services/auth'

interface IAuthState {
    sessionId: string | null
    username: string | null
    loading: boolean
    error: string | null
}

const initialState: IAuthState = {
    sessionId: localStorage.getItem('sessionId'),
    username: localStorage.getItem('username'),
    loading: false,
    error: null

}

export const fetchSignIn = createAsyncThunk<
    { username: string; sessionId: string }, // type of returned data
    { username: string; password: string },  // type of input parameters
    { rejectValue: { message: string } }     // type of rejection error
>(
    'auth/fetchSignIn',
    async ({ username, password }, { rejectWithValue }) => {
        // 1. request token
        const tokenResponse = await requestAuthToken()
        if (tokenResponse.hasError) {
            return rejectWithValue({
                message: tokenResponse.message || 'Token error'
            })
        }

        if (!tokenResponse.request_token) {
            return rejectWithValue({
                message: 'No token received'
            })
        }

        // 2. validate credentials with token
        const validationResponse = await requestValidateTokenWithLogin(
            username,
            password,
            tokenResponse.request_token
        )
        if (validationResponse.hasError) {
            return rejectWithValue({
                message: validationResponse.message || 'Validation error'
            })
        }

        // 3.create session
        const sessionResponse = await requestCreateSession(tokenResponse.request_token)
        if (sessionResponse.hasError) {
            return rejectWithValue({
                message: sessionResponse.message || 'Session error'
            })
        }

        if (!sessionResponse.session_id) {
            return rejectWithValue({
                message: 'No session ID received'
            })
        }

        return { username, sessionId: sessionResponse.session_id }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null
        },
        signOut: (state) => {
            state.sessionId = null
            state.username = null
            localStorage.removeItem('sessionId')
            localStorage.removeItem('username')
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSignIn.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchSignIn.fulfilled, (
                state,
                action: PayloadAction<{ username: string; sessionId: string }>
            ) => {
                state.loading = false
                state.sessionId = action.payload.sessionId
                state.username = action.payload.username
                localStorage.setItem('sessionId', action.payload.sessionId)
                localStorage.setItem('username', action.payload.username)
            })
            .addCase(fetchSignIn.rejected, (state, action: ReturnType<typeof fetchSignIn.rejected>) => {
                state.loading = false
                state.error = action.payload?.message || action.error.message || 'Unknown error'
            })
    }
})

export const { signOut, clearError } = authSlice.actions
export const authReducer = authSlice.reducer