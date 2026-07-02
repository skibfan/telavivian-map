import { ReactElement, useEffect, useState } from "react";
import { BeachAttributes, ShelterAttributes, Feature, OutDoorSportsAttributes } from "./ApiTypes";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../app/store";
import axios from "axios";
import BeachesElement from "./mini-components/BeachesElement";
import SheltersElement from "./mini-components/SheltersElement";
import MarkerClusterGroup from 'react-leaflet-markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import { verify } from "../../auth/Auth";
import OutdoorSportsElement from "./mini-components/OutdoorSportsElement";
import { set_available_sport_types } from "../../features/slice";

const MarkerFactory = ():ReactElement => {
    const dispatch = useDispatch()

    const [favoriteLocations, setFavoriteLocations] = useState<number[]>([])
    const [beachesLocations, setBeachesLocations] = useState<Feature[]>([])
    const [shelterLocations, setShelterLocations] = useState<Feature[]>([])
    const [outdoorSportsLocations, setOutdoorSportsLocations] = useState<Feature[]>([])

    const beachesToggled = useSelector((state: AppState) => state.flagsReducer.beachesFlag)
    const sheltersToggled = useSelector((state: AppState) => state.flagsReducer.sheltersFlag)
    const outdoorSportsToggled = useSelector((state: AppState) => state.flagsReducer.outdoorSportsFlag)
    const onlyFavsToggled = useSelector((state: AppState) => state.flagsReducer.showOnlyFavoritesFlag)
    const beachFilters = useSelector((state: AppState) => state.flagsReducer.beachFilters)
    const selectedSportTypes = useSelector((state: AppState) => state.flagsReducer.selectedSportTypes)

    const path = import.meta.env.VITE_MY_PATH

    const fetchfavs = async () => {
        if (await verify()) {
            try {
                const favResponse = await axios.post(`${path}/api/getfavorites`,
                    {},
                    {withCredentials: true}
                )
                const favItems = favResponse.data.map((elem: {favorite_item: number}) => {return elem.favorite_item})
                setFavoriteLocations(favItems)
            } catch (error) {
                console.log("unauthorized to fetch favorites =>", error);
            }
        }
    }

    const fetchLocations = async () => {
        try {
            if (beachesToggled && beachesLocations.length < 1) {
                const response = await axios.get(`${path}/api/beaches`)
                setBeachesLocations(response.data)
            }
            if (sheltersToggled && shelterLocations.length < 1) {
                const response = await axios.get(`${path}/api/shelters`)
                setShelterLocations(response.data)
            }
            if (outdoorSportsToggled && outdoorSportsLocations.length < 1) {
                const response = await axios.get(`${path}/api/outdoorsports`)
                const data: Feature[] = response.data
                setOutdoorSportsLocations(data)

                const types = [...new Set(data.map(f => (f.attributes as OutDoorSportsAttributes).sug).filter(Boolean))].sort()
                dispatch(set_available_sport_types(types))
            }
        } catch (error) {
            console.log("error on fetching locations =>", error);
        }
    }

    useEffect(()=> {
        fetchLocations()
        fetchfavs()
    }, [beachesToggled, sheltersToggled, outdoorSportsToggled])

    const filteredBeaches = beachesLocations.filter(elem => {
        const a = elem.attributes as BeachAttributes
        if (beachFilters.dogsAllowed && !a.Dogs_allowed) return false
        if (beachFilters.parking && a.Parking.trim() !==  'חניון חופשי') return false
        if (beachFilters.volleyball && a.beach_volleyball !== 'יש') return false
        if (beachFilters.waterSport && a.water_sport !== 'יש') return false
        if (beachFilters.showers && a.showers_desc === 'אין') return false
        return true
    })

    const filteredSports = selectedSportTypes.length === 0
        ? outdoorSportsLocations
        : outdoorSportsLocations.filter(elem => selectedSportTypes.includes((elem.attributes as OutDoorSportsAttributes).sug))

    return (<>
        {beachesToggled
            ? filteredBeaches.map(elem => (
                <BeachesElement
                    key={elem.attributes.UniqueId}
                    attributes={elem.attributes as BeachAttributes}
                    geometry={elem.geometry}
                />
            ))
            : null
        }
        {sheltersToggled
            ? (<MarkerClusterGroup zoomToBoundsOnClick>
                {shelterLocations.map(elem => (
                    <SheltersElement
                        key={(elem.attributes as ShelterAttributes).oid_mitkan}
                        attributes={elem.attributes as ShelterAttributes}
                        geometry={elem.geometry}
                        favoriteLocations={favoriteLocations}
                        onlyFavs={onlyFavsToggled}
                    />
                ))}
            </MarkerClusterGroup>)
            : null
        }
        {outdoorSportsToggled
            ? <MarkerClusterGroup zoomToBoundsOnClick>
                {filteredSports.map(elem => (
                    <OutdoorSportsElement
                        key={(elem.attributes as OutDoorSportsAttributes).oid_mitkan}
                        attributes={elem.attributes as OutDoorSportsAttributes}
                        geometry={elem.geometry}
                        favoriteLocations={favoriteLocations}
                        onlyFavs={onlyFavsToggled}
                    />
                ))}
            </MarkerClusterGroup>
            : null
        }
    </>)
}

export default MarkerFactory
