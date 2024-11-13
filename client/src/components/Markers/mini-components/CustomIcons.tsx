import L from 'leaflet'
import { renderToString } from 'react-dom/server';
// import { FaMapMarkerAlt  } from 'react-icons'
import { LiaMapPinSolid } from 'react-icons/lia';
import { PiMapPinAreaLight } from "react-icons/pi";

const shelterHtml = renderToString(
    <LiaMapPinSolid style={{color:'black', fontSize:'24px'}} />
)
const favShelterHtml = renderToString(
    <LiaMapPinSolid style={{color:'blue', fontSize:'24px'}} />
)
export const shelterIcon = L.divIcon({
    html: shelterHtml,
    className: 'shelter-icon',
    iconSize: [24,24],
    iconAnchor: [12, 24]
})

export const favShelterIcon = L.divIcon({
    html: favShelterHtml,
    className: 'fav-shelter-icon',
    iconSize: [24,24],
    iconAnchor: [12, 24]
})

const outdoorSportsHtml = renderToString(
    <PiMapPinAreaLight style={{color:'black', fontSize:'24px'}} />
)

const favOutdoorSportsHtml = renderToString(
    <PiMapPinAreaLight style={{color:'blue', fontSize:'24px'}} />
)

export const outdoorSportsIcon = L.divIcon({
    html: outdoorSportsHtml,
    className: 'outdoor-sports-icon',
    iconSize: [24,24],
    iconAnchor: [12, 24]
})

export const favOutdoorSportsIcon = L.divIcon({
    html: favOutdoorSportsHtml,
    className: 'fav-outdoor-sports-icon',
    iconSize: [24,24],
    iconAnchor: [12, 24]
})