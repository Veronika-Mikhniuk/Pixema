import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { requestFilms, requestGenres, requestFilm } from '@/services/films'
import { IFilm } from '@/types/IFilm'
import { IFilmDetails } from '@/types/IFilmDetails'
import { IGenre } from '@/types/IGenre'
import { IRequestFilmsParams, IRequestFilmParams, IRequestResponse } from '@/types/FilmsServiceTypes'

interface IFilmState {
    list: IFilm[]
    favoriteIds: number[]
    loading: boolean
    favoritesLoading: boolean
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
    favoriteIds: [],
    loading: false,
    favoritesLoading: false,
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

export const fetchFavoriteIds = createAsyncThunk<
    number[],
    'films' | 'series',
    { rejectValue: IErrorResponse }
>(
    'films/fetchFavoriteIds',
    async (type, { getState, rejectWithValue }) => {
        const state = getState() as { auth: { accountId: string | null } }
        const { accountId } = state.auth

        if (!accountId) {
            return rejectWithValue({
                hasError: true,
                message: 'User not authenticated'
            })
        }

        try {
            // Get 1-st to find out total_pages
            const firstPageData = await requestFilms({
                type,
                endpoint: 'favourites',
                accountId,
                page: 1
            })

            if (firstPageData.hasError) {
                return rejectWithValue(firstPageData as IErrorResponse)
            }

            const totalPages = firstPageData.total_pages || 1
            let allIds: number[] = firstPageData.results?.map(film => film.id) || []

            // If total_pages >1 create array from otherPagesRequests
            if (totalPages > 1) {
                const otherPagesPromises = Array.from(
                    { length: totalPages - 1 },
                    (_, i) => requestFilms({
                        type,
                        endpoint: 'favourites',
                        accountId,
                        page: i + 2
                    })
                )

                const otherPagesData = await Promise.all(otherPagesPromises)

                // Combine all pages
                otherPagesData.forEach(pageData => {
                    if (!pageData.hasError && pageData.results) {
                        allIds = [...allIds, ...pageData.results.map(film => film.id)]
                    }
                })
            }

            return allIds

        } catch (error) {
            return rejectWithValue({
                hasError: true,
                message: 'Failed to fetch favorites'
            })
        }
    }
)

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
        },
        addToFavoriteIds: (state, action: PayloadAction<number>) => {
            state.favoriteIds.push(action.payload);
        },
        removeFromFavoriteIds: (state, action: PayloadAction<number>) => {
            state.favoriteIds = state.favoriteIds.filter(id => id !== action.payload);
        },
        updateFilmsList: (state, action: PayloadAction<IFilm[]>) => {
            state.list = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            // favorites
            .addCase(fetchFavoriteIds.pending, (state) => {
                state.favoritesLoading = true
                state.error = null
            })
            .addCase(fetchFavoriteIds.fulfilled, (state, action: PayloadAction<number[]>) => {
                state.favoritesLoading = false
                state.favoriteIds = action.payload
            })
            .addCase(fetchFavoriteIds.rejected, (state, action) => {
                state.favoritesLoading = false
                state.error = action.payload?.message || action.error.message || 'Unknown error'
            })
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

export const { setSearchQuery, setActiveFilters, clearFilters, addToFavoriteIds, removeFromFavoriteIds, updateFilmsList } = filmsSlice.actions
export const filmsReducer = filmsSlice.reducer 