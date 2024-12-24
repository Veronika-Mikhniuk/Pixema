import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { requestAuthToken, requestValidateTokenWithLogin, requestCreateSession } from '@/services/auth'

const initialState = {
    sessionId: localStorage.getItem('sessionId'),
    username: localStorage.getItem('username'),
    loading: false,
    error: null

}

export const fetchSignIn = createAsyncThunk(
    'films/fetchSignIn',
    async ({ username, password }, { rejectWithValue }) => {
        // 1. request token
        const tokenResponse = await requestAuthToken()
        if (tokenResponse.hasError) return rejectWithValue(tokenResponse)

        // 2. validate credentials with token
        const validationResponse = await requestValidateTokenWithLogin(
            username,
            password,
            tokenResponse.request_token
        )
        if (validationResponse.hasError) return rejectWithValue(validationResponse)

        // 3.create session
        const sessionResponse = await requestCreateSession(tokenResponse.request_token)
        if (sessionResponse.hasError) return rejectWithValue(sessionResponse)

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
            .addCase(fetchSignIn.fulfilled, (state, action) => {
                state.loading = false
                state.sessionId = action.payload.sessionId
                state.username = action.payload.username
                localStorage.setItem('sessionId', action.payload.sessionId)
                localStorage.setItem('username', action.payload.username)
            })
            .addCase(fetchSignIn.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload?.message || action.error.message
            })
    }
})

export const { signOut, clearError } = authSlice.actions
export const authReducer = authSlice.reducer