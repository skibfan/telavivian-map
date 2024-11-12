import L from 'leaflet'
import { renderToString } from 'react-dom/server';
// import { FaMapMarkerAlt  } from 'react-icons'
import { LiaMapPinSolid } from 'react-icons/lia';

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




const customIcon = new L.Icon({
    iconUrl: "https://leafletjs.com/examples/custom-icons/leaf-green.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });