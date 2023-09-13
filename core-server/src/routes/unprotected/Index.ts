import { Router } from 'express'
import userPublicRoute from './UserPublicRoute'
import { USER_UNPROTECTED_API_V1 } from '../../constants/unprotected/UserUnprotectedApi'

const unprotectedRouter: Router = Router()

// version 1
unprotectedRouter.use(USER_UNPROTECTED_API_V1.V0, userPublicRoute)

export default unprotectedRouter
