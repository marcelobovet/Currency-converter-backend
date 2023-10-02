const express = require('express')
const { isAuth, hasRoles } = require('../middlewares/auth')
const router = express.Router()
const userCtrl = require('../controllers/user')
const { converter, getAll, getExcel, getResumeToday } = require('../controllers/converter')

router.post('/signup', userCtrl.signUp)
router.post('/signin', userCtrl.signIn)
router.post('/me', isAuth, userCtrl.getMe)
router.post('/converter', isAuth, converter);

router.post('/transactions', isAuth, hasRoles(['admin']), getAll)
router.post('/excell', isAuth, hasRoles(['admin']), getExcel)
router.post('/today', getResumeToday)


module.exports = router