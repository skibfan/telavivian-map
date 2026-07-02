import { Box, Chip, Divider, FormControlLabel, FormGroup, Switch, Typography } from "@mui/material";
import { ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../app/store";
import { toggle_beaches, toggle_only_favs, toggle_outdoor_sports, toggle_shelters, toggle_beach_filter, toggle_sport_type } from "../features/slice";
import Auth from "../auth/Auth";
import { FaDog, FaParking, FaShower, FaSwimmer } from "react-icons/fa";
import { MdOutlineSportsVolleyball } from "react-icons/md";

const beachFilterConfig = [
    { key: 'dogsAllowed' as const,  label: 'Dogs',       icon: <FaDog /> },
    { key: 'parking'     as const,  label: 'Parking',    icon: <FaParking /> },
    { key: 'volleyball'  as const,  label: 'Beach Sports', icon: <MdOutlineSportsVolleyball /> },
    { key: 'waterSport'  as const,  label: 'Water sport',icon: <FaSwimmer /> },
    { key: 'showers'     as const,  label: 'Showers',    icon: <FaShower /> },
]

const Filter = (): ReactElement => {
    const dispatch = useDispatch()
    const beachesToggled     = useSelector((state: AppState) => state.flagsReducer.beachesFlag)
    const sheltersToggled    = useSelector((state: AppState) => state.flagsReducer.sheltersFlag)
    const outdoorSportsToggled = useSelector((state: AppState) => state.flagsReducer.outdoorSportsFlag)
    const onlyFavsToggled    = useSelector((state: AppState) => state.flagsReducer.showOnlyFavoritesFlag)
    const beachFilters       = useSelector((state: AppState) => state.flagsReducer.beachFilters)
    const availableSportTypes = useSelector((state: AppState) => state.flagsReducer.availableSportTypes)
    const selectedSportTypes  = useSelector((state: AppState) => state.flagsReducer.selectedSportTypes)

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, p: 1.5, minWidth: 220 }}>

            <Auth placeholder={null}>
                <FormGroup>
                    <FormControlLabel
                        control={<Switch checked={onlyFavsToggled} onChange={() => dispatch(toggle_only_favs(onlyFavsToggled))} size="small" />}
                        label={<Typography variant="body2">Show Favorites</Typography>}
                    />
                </FormGroup>
                <Divider />
            </Auth>

            <FormGroup>
                <FormControlLabel
                    control={<Switch checked={beachesToggled} onChange={() => dispatch(toggle_beaches(beachesToggled))} size="small" />}
                    label={<Typography variant="body2" fontWeight={600}>Beaches</Typography>}
                />
            </FormGroup>
            {beachesToggled && (
                <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ pl: 0.5 }}>Filter by amenity</Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mt: 0.5 }}>
                        {beachFilterConfig.map(({ key, label, icon }) => (
                            <Chip
                                key={key}
                                size="small"
                                label={label}
                                icon={icon as React.ReactElement}
                                onClick={() => dispatch(toggle_beach_filter(key))}
                                color={beachFilters[key] ? 'primary' : 'default'}
                                variant={beachFilters[key] ? 'filled' : 'outlined'}
                                sx={{ cursor: 'pointer' }}
                            />
                        ))}
                    </Box>
                </Box>
            )}

            <Divider />

            <FormGroup>
                <FormControlLabel
                    control={<Switch checked={sheltersToggled} onChange={() => dispatch(toggle_shelters(sheltersToggled))} size="small" />}
                    label={<Typography variant="body2" fontWeight={600}>Shelters</Typography>}
                />
            </FormGroup>

            <Divider />

            <FormGroup>
                <FormControlLabel
                    control={<Switch checked={outdoorSportsToggled} onChange={() => dispatch(toggle_outdoor_sports(outdoorSportsToggled))} size="small" />}
                    label={<Typography variant="body2" fontWeight={600}>Outdoor Sports</Typography>}
                />
            </FormGroup>
            {outdoorSportsToggled && availableSportTypes.length > 0 && (
                <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ pl: 0.5 }}>Filter by sport</Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mt: 0.5 }}>
                        {availableSportTypes.map(type => {
                            const active = selectedSportTypes.length === 0 || selectedSportTypes.includes(type)
                            return (
                                <Chip
                                    key={type}
                                    size="small"
                                    label={type}
                                    onClick={() => dispatch(toggle_sport_type(type))}
                                    color={active ? 'primary' : 'default'}
                                    variant={active ? 'filled' : 'outlined'}
                                    sx={{ cursor: 'pointer' }}
                                />
                            )
                        })}
                    </Box>
                </Box>
            )}
        </Box>
    )
}

export default Filter
