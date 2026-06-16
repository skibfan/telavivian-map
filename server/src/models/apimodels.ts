import axios from 'axios'
import NodeCache from 'node-cache'

// Codes for map layers:
// beaches - 579
// shelters - 592
// outdoor sports - 834

const cache = new NodeCache({ stdTTL: 600 })

export const _getBeachesApi = async () => {
    return getDataWithCode('579')
}

export const _getSheltersApi = async () => {
    return getDataWithCode('592')
}

export const _getOutdoorSportsApi = async () => {
    return getDataWithCode('834')
}

const getDataWithCode = async (layerCode: string) => {
    const cached = cache.get(layerCode)
    if (cached) return cached

    try {
        const response = await axios.get(`https://gisn.tel-aviv.gov.il/GisOpenData/service.asmx/GetLayer?layerCode=${layerCode}&layerWhere=&xmin=&ymin=&xmax=&ymax=&projection=`)
        cache.set(layerCode, response.data)
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}