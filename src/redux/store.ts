import { configureStore } from "@reduxjs/toolkit"
import { filmsReducer } from "@/redux/films-slice"

export const store = configureStore({
    reducer: {
        films: filmsReducer
    }
})

export type RootState = ReturnType<typeof store.getState>