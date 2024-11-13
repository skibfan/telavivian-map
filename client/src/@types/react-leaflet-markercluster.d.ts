
declare module "react-leaflet-markercluster" {
    import { Component } from "react";
    import { LayerGroupProps } from "react-leaflet";
    import { MarkerClusterGroupOptions } from "leaflet";

    export interface MarkerClusterGroupProps extends LayerGroupProps, MarkerClusterGroupOptions {
        children?: React.ReactNode;
        zoomToBoundsOnClick?: boolean;
        spiderfyOnMaxZoom?: boolean;
        showCoverageOnHover?: boolean;
        maxClusterRadius?: number;
        removeOutsideVisibleBounds?: boolean;
    }

    export default class MarkerClusterGroup extends Component<MarkerClusterGroupProps> {}
}