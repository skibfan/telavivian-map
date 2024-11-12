
import { Geometry, ShelterAttributes } from '../ApiTypes';
import proj4 from 'proj4';
import { Marker, Popup } from 'react-leaflet';
import { ReactElement, useState } from 'react';
import { shelterIcon, favShelterIcon } from './CustomIcons';
import { IconButton } from '@mui/material';
import {Bookmark, BookmarkBorder } from "@mui/icons-material";
import axios from 'axios';
import { verify } from '../../../auth/Auth';

proj4.defs("EPSG:2039", "+proj=tmerc +lat_0=31.73439361111111 +lon_0=35.20451694444445 +k=1.0000067 +x_0=219529.584 +y_0=626907.39 +datum=WGS84 +units=m +no_defs");

type SheltersElementProps = {
    attributes: ShelterAttributes;
    geometry: Geometry;
    favoriteLocations: number[]
}


const SheltersElement = ({attributes, geometry, favoriteLocations}: SheltersElementProps): ReactElement => {
    
    const [isFavorite, setIsFavorite] = useState(favoriteLocations.includes(attributes.oid_mitkan))

    const transformCoordinates = (x: number, y: number): [number, number] => {
        const [lon, lat] = proj4("EPSG:2039", "EPSG:4326", [x, y]) as [number, number];
        return [lat, lon];
    }

    const addToFavorites = async (oid_mitkan: number) => {
        try {
            await axios.post("http://localhost:3001/api/addfavorite", 
            {favorite_item: oid_mitkan},
            {withCredentials: true}
        )
        } catch (error) {
            console.log("unauthorized or unable to add favorites =>", error);
        }
    }

    const removeFavorite = async (oid_mitkan: number) => {
        try {
            await axios.post("http://localhost:3001/api/removefavorite", 
                {favorite_item: oid_mitkan},
                {withCredentials: true}
            )
        } catch (error) {
            console.log("unauthorized or unable to delete favorites =>", error);
        }
    }


    const handleFavorites = async (oid_mitkan: number) => {
        
        
        // TODO: how to load it in a proper way? 
        console.log(favoriteLocations);
        if (await verify()) {
            
            if (isFavorite) {
                removeFavorite(oid_mitkan)
                setIsFavorite(false)
            } else {
                addToFavorites(oid_mitkan)
                setIsFavorite(true)
            }
        } else {
            console.log('necookie');
            
        }
    }

    return (<>
    {geometry.x && geometry.y ?
    <Marker 
        position={transformCoordinates(geometry.x, geometry.y)}
        icon={isFavorite ? favShelterIcon : shelterIcon}
    >
        <Popup>
            {attributes.Full_Address}
            <IconButton onClick={() => handleFavorites(attributes.oid_mitkan)}>
                {
                    isFavorite ?
                    <Bookmark style={{ color: "gold", margin: "12px" }}/> : <BookmarkBorder style={{ margin: "12px" }} /> }
            </IconButton>
        </Popup>

    </Marker> : null
}
    </>)
}

export default SheltersElement