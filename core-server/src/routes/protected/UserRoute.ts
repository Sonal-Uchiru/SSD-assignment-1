import { Router } from 'express'
import UserController from '../../controllers/protected/UserController'

const userRoute = Router()

userRoute.get('/', UserController.getUserAsync)

userRoute.get('/list', UserController.getUserListAsync)

userRoute.put('/', UserController.updateUserAsync)

userRoute.delete('/', UserController.deleteUserAsync)

userRoute.patch('/changePassword', UserController.changePasswordUserAsync)

export default userRoute
