import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../app/store";
import { toggle_beaches, toggle_only_favs, toggle_outdoor_sports, toggle_shelters } from "../features/slice";
import Auth from "../auth/Auth";


const Filter = (): ReactElement => {
    const dispatch = useDispatch()
    const beachesToggled = useSelector((state: AppState) => state.flagsReducer.beachesFlag)
    const sheltersToggled = useSelector((state: AppState) => state.flagsReducer.sheltersFlag)
    const outdoorSportsToggled = useSelector((state: AppState) => state.flagsReducer.outdoorSportsFlag)
    const onlyFavsToggled = useSelector((state: AppState) => state.flagsReducer.showOnlyFavoritesFlag)
    return (<>
    <FormGroup>
    <Auth placeholder={null}><FormControlLabel style={{borderBottom:'1px solid', borderRight:'1px solid'}} control={<Checkbox checked={onlyFavsToggled} onChange={() => dispatch(toggle_only_favs(onlyFavsToggled))} />} label='Show Favorites' /></Auth>
        <FormControlLabel control={<Checkbox checked={beachesToggled} onChange={() => dispatch(toggle_beaches(beachesToggled))} />} label='Beaches' />
        <FormControlLabel control={<Checkbox checked={sheltersToggled} onChange={() => dispatch(toggle_shelters(sheltersToggled))} />} label='Shelters'/>
        <FormControlLabel control={<Checkbox checked={outdoorSportsToggled} onChange={() => dispatch(toggle_outdoor_sports(outdoorSportsToggled))} />} label='Outdoor Sports' /> 

        {/* <FormControlLabel required control={<Checkbox />} label="Required" />
        <FormControlLabel disabled control={<Checkbox />} label="Disabled" /> */}
    </FormGroup>
    </>)
}

export default Filter