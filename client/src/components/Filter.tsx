import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../app/store";
import { toggle_beaches, toggle_shelters } from "../features/slice";


const Filter = (): ReactElement => {
    const dispatch = useDispatch()
    const beachesToggled = useSelector((state: AppState) => state.flagsReducer.beachesFlag)
    const sheltersToggled = useSelector((state: AppState) => state.flagsReducer.sheltersFlag)

    return (<>
    <FormGroup>
        <FormControlLabel control={<Checkbox checked={beachesToggled} onChange={() => dispatch(toggle_beaches(beachesToggled))} />} label='Beaches' />
        <FormControlLabel control={<Checkbox checked={sheltersToggled} onChange={() => dispatch(toggle_shelters(sheltersToggled))} />} label='Shelters'/>
        

        {/* <FormControlLabel required control={<Checkbox />} label="Required" />
        <FormControlLabel disabled control={<Checkbox />} label="Disabled" /> */}
    </FormGroup>
    </>)
}

export default Filter