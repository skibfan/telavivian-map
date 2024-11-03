import express from 'express'
import { getBeachesApi, getSheltersApi } from '../controllers/apicontrollers'

const router = express.Router()

// router.use(express.static(path.resolve('./public2')));
// router.post('/weather', getApiData)

router.get('/beaches', getBeachesApi)
router.get('/shelters', getSheltersApi)

export default router