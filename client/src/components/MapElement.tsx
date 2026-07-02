import { Box } from "@mui/material";
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { useEffect } from 'react';
import MarkerFactory from './Markers/MarkerFactory'

const MapResizer = () => {
    const map = useMap()
    useEffect(() => {
        map.invalidateSize()
    }, [])
    return null
}

const MapElement = () => {
    return (
        <Box
            component="section"
            sx={{ p: 2, border: '1px dashed grey', height: { xs: '350px', sm: '500px' } }}
        >
            <MapContainer
                center={[32.08, 34.77]}
                zoom={12}
                scrollWheelZoom={false}
                style={{ height: "100%", width: "100%" }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url='https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png'
                />
                <MapResizer />
                <MarkerFactory />
            </MapContainer>
        </Box>
    )
}

export default MapElement
