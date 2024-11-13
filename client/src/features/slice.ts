import { createSlice } from "@reduxjs/toolkit";


type InitialStateT = {
    showOnlyFavoritesFlag: boolean;
    beachesFlag: boolean;
    sheltersFlag: boolean;
    outdoorSportsFlag: boolean;
}

const initialState: InitialStateT = {
    showOnlyFavoritesFlag: false,
    beachesFlag: true,
    sheltersFlag: false,
    outdoorSportsFlag: true,
}

const flagsSlice = createSlice({
    name: "flags",
    initialState,
    reducers: {
        toggle_only_favs: (state, _) => {
            state.showOnlyFavoritesFlag = !state.showOnlyFavoritesFlag
        },
        toggle_beaches: (state, _) => {
            state.beachesFlag = !state.beachesFlag
        },
        toggle_shelters: (state, _) => {
            state.sheltersFlag = !state.sheltersFlag
        },
        toggle_outdoor_sports: (state, _) => {
            state.outdoorSportsFlag = !state.outdoorSportsFlag
        }

    }
})

export const { toggle_only_favs, toggle_beaches, 
    toggle_shelters, toggle_outdoor_sports } = flagsSlice.actions
export default flagsSlice.reducer