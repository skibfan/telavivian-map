import express from 'express'
import { getBeachesApi, getSheltersApi } from '../controllers/apicontrollers'
import { addFavorite, getFavorites, loginUser, logOutUser, registerNewU, removeFavorite, verifyAuth } from '../controllers/controllers'
import { verifyToken } from '../middleware/verifyToken'
const router = express.Router()

// router.use(express.static(path.resolve('./public2')));
// router.post('/weather', getApiData)

router.get('/beaches', getBeachesApi)
router.get('/shelters', getSheltersApi)


router.post('/getfavorites',verifyToken, getFavorites)
router.post('/addfavorite', verifyToken, addFavorite)
router.post('/removefavorite', verifyToken, removeFavorite)
// router.post('/getfavorites', verifyToken, getFavorites)
// router.post('/favorites', verifyToken, addFavorite)

router.post('/register', registerNewU)
router.post('/login', loginUser)
router.get('/logout', logOutUser)


router.get('/auth', verifyToken, verifyAuth)


export default router