import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { requestFilms, requestSeries } from "@/services/films"

const initialState = {
    list: [],
    loading: false,
    error: null,
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

export const fetchSeries = createAsyncThunk(
    'films/fetchSeries',
    async (params = {}, { rejectWithValue }) => {
        const data = await requestSeries(params)

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
            //allFilms
            .addCase(fetchFilms.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchFilms.fulfilled, (state, action) => {
                state.isLoading = false
                state.list = action.payload.results
            })
            .addCase(fetchFilms.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
            })
            //allSeries
            .addCase(fetchSeries.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchSeries.fulfilled, (state, action) => {
                state.isLoading = false
                state.list = action.payload.results
            })
            .addCase(fetchSeries.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
            })
    }
})

export const filmsReducer = filmsSlice.reducer  