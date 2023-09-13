import { Router } from 'express'
import authenticationRoute from './AuthenticationRoute'
import { AUTH_API_V1 } from '../../constants/authentication/AuthApi'

const authenticationRouter: Router = Router()

authenticationRouter.use(AUTH_API_V1.V0, authenticationRoute)

export default authenticationRouter
