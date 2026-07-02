import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type BeachFilters = {
    dogsAllowed: boolean;
    parking: boolean;
    volleyball: boolean;
    waterSport: boolean;
    showers: boolean;
}

type InitialStateT = {
    showOnlyFavoritesFlag: boolean;
    beachesFlag: boolean;
    sheltersFlag: boolean;
    outdoorSportsFlag: boolean;
    beachFilters: BeachFilters;
    availableSportTypes: string[];
    selectedSportTypes: string[];
}

const initialState: InitialStateT = {
    showOnlyFavoritesFlag: false,
    beachesFlag: true,
    sheltersFlag: false,
    outdoorSportsFlag: true,
    beachFilters: {
        dogsAllowed: false,
        parking: false,
        volleyball: false,
        waterSport: false,
        showers: false,
    },
    availableSportTypes: [],
    selectedSportTypes: [],
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
        },
        toggle_beach_filter: (state, action: PayloadAction<keyof BeachFilters>) => {
            state.beachFilters[action.payload] = !state.beachFilters[action.payload]
        },
        set_available_sport_types: (state, action: PayloadAction<string[]>) => {
            state.availableSportTypes = action.payload
        },
        toggle_sport_type: (state, action: PayloadAction<string>) => {
            const idx = state.selectedSportTypes.indexOf(action.payload)
            if (idx >= 0) {
                state.selectedSportTypes.splice(idx, 1)
            } else {
                state.selectedSportTypes.push(action.payload)
            }
        },
    }
})

export const { toggle_only_favs, toggle_beaches,
    toggle_shelters, toggle_outdoor_sports,
    toggle_beach_filter, set_available_sport_types, toggle_sport_type } = flagsSlice.actions
export default flagsSlice.reducer
