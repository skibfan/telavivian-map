import { ReactElement, useEffect, useState } from "react";
import { BeachAttributes, ShelterAttributes, Feature } from "./ApiTypes";
import { useSelector } from "react-redux";
import { AppState } from "../../app/store";
import axios from "axios";
import BeachesElement from "./mini-components/BeachesElement";
import SheltersElement from "./mini-components/SheltersElement";
import MarkerClusterGroup from 'react-leaflet-markercluster';
import 'react-leaflet-markercluster/dist/styles.min.css';
import { verify } from "../../auth/Auth";



const MarkerFactory = ():ReactElement => {

    const [beachesLocations, setBeachesLocations] = useState<Feature[]>([])
    const [shelterLocations, setShelterLocations] = useState<Feature[]>([])
    const [favoriteLocations, setFavoriteLocations] = useState<number[]>([])
    const beachesToggled = useSelector((state: AppState) => state.flagsReducer.beachesFlag)
    const sheltersToggled = useSelector((state: AppState) => state.flagsReducer.sheltersFlag)

    // const [onlyFavorites, setOnlyFavorites] = useState(false)



    const fetchfavs = async () => {
        if (await verify()) {
        try {
            const favResponse = await axios.post("http://localhost:3001/api/getfavorites", 
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
                const response = await axios.get("http://localhost:3001/api/beaches")
                setBeachesLocations(response.data)
            }
            if (sheltersToggled && shelterLocations.length < 1) {
                const response = await axios.get("http://localhost:3001/api/shelters")
                setShelterLocations(response.data)
            }

        } catch (error) {
            console.log("error on fetching locations =>", error);
        }  
    }
    useEffect(()=> {
        fetchLocations()
        fetchfavs()
    }, [beachesToggled, sheltersToggled])

    
    useEffect(() => {
        console.log('here=>',favoriteLocations);
    }, [favoriteLocations])
    return (<> 

        {
            beachesToggled ?
            beachesLocations.map(elem => { return <BeachesElement key={elem.attributes.UniqueId} 
                attributes={elem.attributes as BeachAttributes} geometry={elem.geometry}/>})
            : null
            }
        {
            sheltersToggled ?
            // TODO: why this works? 
            <MarkerClusterGroup zoomToBoundsOnClick>{
                shelterLocations.map(elem => {
                    return <SheltersElement key={(elem.attributes as ShelterAttributes).oid_mitkan} 
                    attributes={elem.attributes as ShelterAttributes} geometry={elem.geometry}
                    favoriteLocations={favoriteLocations}
                    />})
            }</MarkerClusterGroup>
                : null
        }
    </>)
}

export default MarkerFactory