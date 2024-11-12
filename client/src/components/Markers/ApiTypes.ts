
export interface Geometry {
    x?: number;
    y?: number;
    rings?: Array<Array<[number, number]>>;
}

export interface BeachAttributes {
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

export interface ShelterAttributes {
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

export type GeneralAttributes = BeachAttributes | ShelterAttributes;

export interface Feature {
    attributes: GeneralAttributes;
    geometry: Geometry;
}
