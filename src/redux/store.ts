import { configureStore } from "@reduxjs/toolkit"
import { filmsReducer } from "@/redux/films-slice"
import { authReducer } from "@/redux/auth-slice"

export const store = configureStore({
    reducer: {
        films: filmsReducer,
        auth: authReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch