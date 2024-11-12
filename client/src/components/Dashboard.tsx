import { ReactElement } from "react";

import 'leaflet/dist/leaflet.css'; 
import MapElement from "./MapElement";
import Filter from "./Filter";

const Dashboard = (): ReactElement => {
    return (<div className="map-container">
        <MapElement/>
        <Filter/>
        </div>
    );
};

export default Dashboard;
