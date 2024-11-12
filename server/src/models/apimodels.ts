import axios from 'axios'
// Codes for map layers:
// beaches - 579
// shelters - 592

export const _getBeachesApi = async () => {
    return getDataWithCode('579')
}


export const _getSheltersApi = async () => {
    return getDataWithCode('592')
}

// 834 
export const _getOutdoorSportsApi = async () => {
    return getDataWithCode('834')
}


const getDataWithCode = async (layerCode: string) => {

    try {
        const respons = await axios.get(`https://gisn.tel-aviv.gov.il/GisOpenData/service.asmx/GetLayer?layerCode=${layerCode}&layerWhere=&xmin=&ymin=&xmax=&ymax=&projection=`)
        return respons.data
    } catch (error) {
        console.log(error);
        throw error
        
    }
}