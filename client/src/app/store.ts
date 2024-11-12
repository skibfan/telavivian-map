import { configureStore, combineReducers } from "@reduxjs/toolkit";
import flagsReducer from '../features/slice'

const appReducer = combineReducers({
    flagsReducer,
})

const store = configureStore({
    reducer: appReducer
})

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store