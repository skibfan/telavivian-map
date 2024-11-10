import express from 'express'
import { getBeachesApi, getSheltersApi } from '../controllers/apicontrollers'
import { addFavorite, getFavorites, loginUser, registerNewU } from '../controllers/controllers'
import { verifyToken } from '../middleware/verifyToken'
const router = express.Router()

// router.use(express.static(path.resolve('./public2')));
// router.post('/weather', getApiData)

router.get('/beaches', getBeachesApi)
router.get('/shelters', getSheltersApi)


router.post('/getfavorites', getFavorites)
router.post('/addfavorite', addFavorite)
// router.post('/getfavorites', verifyToken, getFavorites)
// router.post('/favorites', verifyToken, addFavorite)

router.post('/register', registerNewU)
router.post('/login', loginUser)


export default router