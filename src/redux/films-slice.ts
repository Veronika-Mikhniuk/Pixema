import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { requestFilms, requestGenres, requestFilm } from '@/services/films'
import { IFilm } from '@/types/IFilm'
import { IFilmDetails } from '@/types/IFilmDetails'
import { IGenre } from '@/types/IGenre'
import { IRequestFilmsParams, IRequestFilmParams, IRequestResponse } from '@/types/FilmsServiceTypes'

interface IFilmState {
    list: IFilm[]
    loading: boolean
    error: string | null
    pageCount: number | null
    currentFilm: IFilmDetails | null
    searchQuery: string | null
    activeFilters: Record<string, string> | null
    genres: IGenre[]
    genresLoading: boolean
    genresError: string | null
}

const initialState: IFilmState = {
    list: [],
    loading: false,
    error: null,
    pageCount: null,
    currentFilm: null,
    searchQuery: null,
    activeFilters: null,
    genres: [],
    genresLoading: false,
    genresError: null
}

interface IErrorResponse {
    hasError: boolean
    message: string
}

export const fetchFilms = createAsyncThunk<
    IRequestResponse,
    IRequestFilmsParams,
    { rejectValue: IErrorResponse }
>(
    'films/fetchFilms',
    async (params = {}, { rejectWithValue }) => {
        const data = await requestFilms(params)

        if (data.hasError) {
            return rejectWithValue(data as IErrorResponse)
        }

        return data
    }
)

export const fetchFilm = createAsyncThunk<
    IRequestResponse,
    IRequestFilmParams,
    { rejectValue: IErrorResponse }
>(
    'films/fetchFilm',
    async (params = {}, { rejectWithValue }) => {
        const data = await requestFilm(params)

        if (data.hasError) {
            return rejectWithValue(data as IErrorResponse)
        }

        return data
    }
)

export const fetchGenres = createAsyncThunk<
    { genres: IGenre[] },
    void,
    { rejectValue: IErrorResponse }
>(
    'films/fetchGenres',
    async (_, { rejectWithValue }) => {
        const data = await requestGenres()

        if (data.hasError) {
            return rejectWithValue(data as IErrorResponse)
        }

        return { genres: data.genres || [] }
    }
)

export const filmsSlice = createSlice({
    name: 'films',
    initialState,
    reducers: {
        setSearchQuery: (state, action: PayloadAction<string | null>) => {
            state.searchQuery = action.payload
        },
        setActiveFilters: (state, action: PayloadAction<Record<string, string> | null>) => {
            state.activeFilters = action.payload
        },
        clearFilters: (state) => {
            state.activeFilters = null
        }
    },
    extraReducers: (builder) => {
        builder
            // films
            .addCase(fetchFilms.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchFilms.fulfilled, (state, action: PayloadAction<IRequestResponse>) => {
                state.loading = false
                state.list = action.payload.results || []
                state.pageCount = action.payload.total_pages || null
            })
            .addCase(fetchFilms.rejected, (state, action: ReturnType<typeof fetchFilms.rejected>) => {
                state.loading = false
                state.error = action.error.message || 'Unknown error'
            })
            // film
            .addCase(fetchFilm.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchFilm.fulfilled, (state, action: PayloadAction<IRequestResponse>) => {
                state.loading = false
                state.currentFilm = action.payload as IFilmDetails
            })
            .addCase(fetchFilm.rejected, (state, action: ReturnType<typeof fetchFilm.rejected>) => {
                state.loading = false
                state.error = action.error.message || 'Unknown error'
            })
            // genres
            .addCase(fetchGenres.pending, (state) => {
                state.genresLoading = true
                state.genresError = null
            })
            .addCase(fetchGenres.fulfilled, (state, action: PayloadAction<{ genres: IGenre[] }>) => {
                state.genresLoading = false
                state.genres = action.payload.genres
            })
            .addCase(fetchGenres.rejected, (state, action: ReturnType<typeof fetchGenres.rejected>) => {
                state.genresLoading = false
                state.genresError = action.error.message || 'Unknown error'
            })

    }
})

export const { setSearchQuery, setActiveFilters, clearFilters } = filmsSlice.actions
export const filmsReducer = filmsSlice.reducer 