import { configureStore } from "@reduxjs/toolkit"
import { filmsReducer } from "@/redux/films-slice"

export const store = configureStore({
    reducer: {
        films: filmsReducer
    }
})