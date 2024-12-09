import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { requestFilms } from "@/services/films"

const initialState = {
    list: [],
    loading: false,
    error: null,
    pageCount: null
}

export const fetchFilms = createAsyncThunk(
    'films/fetchFilms',
    async (params = {}, { rejectWithValue }) => {
        const data = await requestFilms(params)

        if (data.hasError) {
            return rejectWithValue(data)
        }

        return data
    }
)

export const filmsSlice = createSlice({
    name: 'films',
    initialState,
    reucers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFilms.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchFilms.fulfilled, (state, action) => {
                state.isLoading = false
                state.list = action.payload.results
                state.pageCount = action.payload.total_pages
            })
            .addCase(fetchFilms.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
            })

    }
})

export const filmsReducer = filmsSlice.reducer  