import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { requestAddToFavorites } from '@/services/userActions'
import { IAddToFavoritesParams, IAddToFavoritesResponse } from '@/types/FavoritesServiceTypes'

interface IFavoritesState {
    loading: boolean
    error: string | null
}

const initialState: IFavoritesState = {
    loading: false,
    error: null
}

interface IErrorResponse {
    hasError: boolean
    message: string
}

export const fetchAddToFavorites = createAsyncThunk<
    IAddToFavoritesResponse,
    IAddToFavoritesParams,
    { rejectValue: IErrorResponse }
>(
    'favorites/fetchAddToFavorites',
    async (params, { rejectWithValue, getState }) => {
        const state = getState() as { auth: { accountId: string | null } }
        const { accountId } = state.auth

        if (!accountId) {
            return rejectWithValue({
                hasError: true,
                message: 'User not authenticated'
            })
        }

        const data = await requestAddToFavorites({ ...params, accountId })

        if (data.hasError) {
            return rejectWithValue(data as IErrorResponse)
        }

        return data
    }
)

export const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // addToFavorites
            .addCase(fetchAddToFavorites.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchAddToFavorites.fulfilled, (state) => {
                state.loading = false
            })
            .addCase(fetchAddToFavorites.rejected, (state, action: ReturnType<typeof fetchAddToFavorites.rejected>) => {
                state.loading = false
                state.error = action.error.message || 'Unknown error'
            })
    }
})

export const favoritesReducer = favoritesSlice.reducer 