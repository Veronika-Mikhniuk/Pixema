import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { requestFilms, requestGenres, requestFilm } from "@/services/films"

const initialState = {
    list: [],
    loading: false,
    error: null,
    pageCount: null,
    currentFilm: null,
    searchQuery: null,
    genres: [],
    genresLoading: false,
    genresError: null
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

export const fetchFilm = createAsyncThunk(
    'films/fetchFilm',
    async (params = {}, { rejectWithValue }) => {
        const data = await requestFilm(params)

        if (data.hasError) {
            return rejectWithValue(data)
        }

        return data
    }
)

export const fetchGenres = createAsyncThunk(
    'films/fetchGenres',
    async (_, { rejectWithValue }) => {
        const data = await requestGenres()

        if (data.hasError) {
            return rejectWithValue(data)
        }

        return data
    }
)

export const filmsSlice = createSlice({
    name: 'films',
    initialState,
    reducers: {
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            // films
            .addCase(fetchFilms.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchFilms.fulfilled, (state, action) => {
                state.loading = false
                state.list = action.payload.results
                state.pageCount = action.payload.total_pages
            })
            .addCase(fetchFilms.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            // film
            .addCase(fetchFilm.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchFilm.fulfilled, (state, action) => {
                state.loading = false
                state.currentFilm = action.payload
            })
            .addCase(fetchFilm.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            // genres
            .addCase(fetchGenres.pending, (state) => {
                state.genresLoading = true
                state.genresError = null
            })
            .addCase(fetchGenres.fulfilled, (state, action) => {
                state.genresLoading = false
                state.genres = action.payload.genres
            })
            .addCase(fetchGenres.rejected, (state, action) => {
                state.genresLoading = false
                state.genresError = action.error.message
            })

    }
})

export const { setSearchQuery } = filmsSlice.actions
export const filmsReducer = filmsSlice.reducer 