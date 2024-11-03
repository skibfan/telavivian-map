import { _getBeachesApi, _getSheltersApi } from "../models/apimodels"

// interface BeachApiResponse {
//     displayFieldName: string;
//     fieldAliases: Record<string, string>;
//     geometryType: string;
//     spatialReference: {
//         wkid: number;
//         latestWkid: number;
//     };
//     fields: Array<{
//         name: string;
//         type: string;
//         alias: string;
//         length?: number;
//     }>;
//     features: Array<{
//         attributes: {
//             OBJECTID: number;
//             beach_name: string;
//             beach_code: string;
//             accessibility_desc: string;
//             showers_desc: string;
//             sport_facilities: string;
//             playground: string;
//             water_sport: string;
//             beach_volleyball: string;
//             cafeteria: string;
//             Lighting: string;
//             Parking: string;
//             Dogs_allowed: string | null;
//             date_import: string;
//             Shape_Length: number;
//             Shape_Area: number;
//             UniqueId: string;
//             station_num: number;
//         };
//         geometry: {
//             rings: Array<Array<[number, number]>>;
//         };
//     }>;
// }




// // export const getApiData = async (req, res) =>  {
// //     const {location} = req.body
// //     try {
// //         const data = await _getApiData(location)
// //         res.json(data)
// //     } catch (error) {
// //         res.sendStatus(500)
// //     }
   
// // } 

// export const getBeachesApi = async (_: any, res: any) => {

//     try {
//         const data = await _getBeachesApi() as BeachApiResponse
//         res.json(data.features)
//     } catch (error) {
//         console.error("Failed to fetch beach data:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// }

// export const getSheltersApi = async (_: any, res: any) => {

//     try {
//         const data = await _getSheltersApi() as BeachApiResponse
//         res.json(data.features)
//     } catch (error) {
//         console.error("Failed to fetch beach data:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// }


// import { _getBeachesApi, _getSheltersApi } from "../models/apimodels";

// Common structure for spatial reference and geometry
interface SpatialReference {
    wkid: number;
    latestWkid: number;
}

interface Field {
    name: string;
    type: string;
    alias: string;
    length?: number;
}

interface Geometry {
    x?: number;
    y?: number;
    rings?: Array<Array<[number, number]>>;
}

// Beach-specific attributes
interface BeachAttributes {
    OBJECTID: number;
    beach_name: string;
    beach_code: string;
    accessibility_desc: string;
    showers_desc: string;
    sport_facilities: string;
    playground: string;
    water_sport: string;
    beach_volleyball: string;
    cafeteria: string;
    Lighting: string;
    Parking: string;
    Dogs_allowed: string | null;
    date_import: string;
    Shape_Length: number;
    Shape_Area: number;
    UniqueId: string;
    station_num: number;
}

// Shelter-specific attributes based on your uploaded file
interface ShelterAttributes {
    oid_mitkan: number;
    ms_miklat: number;
    k_sug: number;
    t_sug: string;
    k_rechov: number;
    shem_recho: string;
    ms_bait: number;
    knisa: string;
    Full_Address: string;
    shem_rechov_eng: string;
    shetach_mr: number;
    k_sinon: number;
    t_sinon: string;
    hearot: string;
    h_sug: string;
    x_coord: number;
    y_coord: number;
    lon: number;
    lat: number;
    shem_baalim: string | null;
    shem: string | null;
    pail: string;
    from_time: string;
    to_time: string;
    opening_times: string;
    url_tik: string | null;
    telephone_henion: string | null;
    maneger_name: string | null;
    email: string | null;
    celolar: string | null;
    is_open: string;
    UniqueId: string;
    date_import: string;
}

// Generalized attributes with type unions for both beaches and shelters
type GeneralAttributes = BeachAttributes | ShelterAttributes;

interface Feature {
    attributes: GeneralAttributes;
    geometry: Geometry;
}

// Generalized API Response
interface GeneralApiResponse {
    displayFieldName: string;
    fieldAliases: Record<string, string>;
    geometryType: string;
    spatialReference: SpatialReference;
    fields: Field[];
    features: Feature[];
}

// Controller for beaches
export const getBeachesApi = async (_: any, res: any) => {
    try {
        const data = await _getBeachesApi() as GeneralApiResponse;
        res.json(data.features);
    } catch (error) {
        console.error("Failed to fetch beach data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

// Controller for shelters
export const getSheltersApi = async (_: any, res: any) => {
    try {
        const data = await _getSheltersApi() as GeneralApiResponse;
        res.json(data.features);
    } catch (error) {
        console.error("Failed to fetch shelter data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
