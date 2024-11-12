import { createSlice } from "@reduxjs/toolkit";


type InitialStateT = {
    beachesFlag: boolean;
    sheltersFlag: boolean;
}

const initialState: InitialStateT = {
    beachesFlag: true,
    sheltersFlag: false,
}

const flagsSlice = createSlice({
    name: "flags",
    initialState,
    reducers: {
        toggle_beaches: (state, action) => {
            state.beachesFlag = !state.beachesFlag
        },
        toggle_shelters: (state, action) => {
            state.sheltersFlag = !state.sheltersFlag
        }
    }
})

export const {toggle_beaches, toggle_shelters} = flagsSlice.actions
export default flagsSlice.reducer