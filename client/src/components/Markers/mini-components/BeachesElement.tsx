import L from 'leaflet'
import { ReactElement } from 'react';
import { Marker, Polygon, Popup, Tooltip } from 'react-leaflet';
import { BeachAttributes, Geometry } from '../ApiTypes';
import proj4 from 'proj4';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { MdOutlineSportsVolleyball } from 'react-icons/md';
import { Stack } from '@mui/material';
import { FaDog, FaShower, FaSwimmer } from 'react-icons/fa';
import { GrCafeteria } from 'react-icons/gr';

proj4.defs("EPSG:2039", "+proj=tmerc +lat_0=31.73439361111111 +lon_0=35.20451694444445 +k=1.0000067 +x_0=219529.584 +y_0=626907.39 +datum=WGS84 +units=m +no_defs");

type BeachesElementProps = {
    attributes: BeachAttributes;
    geometry: Geometry;
}

const BeachesElement = ({attributes, geometry}: BeachesElementProps): ReactElement => {
    const transformCoordinates = (itmCoordinates: [number, number][]): [number, number][] => {
        
        return itmCoordinates.map(([x, y]) => {
            
            const [lon, lat] = proj4("EPSG:2039", "EPSG:4326", [x, y]);
            return [lat, lon]; 
        });
    }
    return (<>
        <Polygon
        pathOptions={{color: 'teal'}}
        positions={geometry.rings!.map(elem => transformCoordinates(elem))}
    >
        <Tooltip sticky>
            {attributes.beach_name}
            <Stack spacing={2} direction={"row"}>
            {attributes.beach_volleyball ==='יש' ? <MdOutlineSportsVolleyball style={{color: "green"}}/> : <MdOutlineSportsVolleyball style={{color: "red"}}/>}
            {attributes.showers_desc !== 'אין' ? <FaShower style={{color: "green"}}/> : <FaShower style={{color: "red"}}/>}
            {attributes.water_sport === 'יש' ? <FaSwimmer style={{color: "green"}} /> : <FaSwimmer style={{color: "red"}}/>}
            {attributes.cafeteria === 'יש' ? <GrCafeteria style={{color: "green"}}/> : <GrCafeteria style={{color: "red"}}/>}
            {attributes.Dogs_allowed ? <FaDog style={{color: "green"}}/> : <FaDog style={{color: "red"}}/>}
            </Stack>
        </Tooltip>    
    </Polygon>
    
    </>)
}

export default BeachesElement


// <MdOutlineSportsVolleyball />