import { Router } from 'express'
import UserPublicController from '../../controllers/unprotected/UserPublicController'

const userPublicRoute = Router()

/**
 * @swagger
 *  components:
 *      schemas:
 *          CreateUserCommand:
 *              type: object
 *              properties:
 *                  firstName:
 *                      type: string
 *                  lastName:
 *                      type: string
 *                  email:
 *                      type: string
 *                      format: email
 *                  password:
 *                      type: string
 *                      format: password
 *                  role:
 *                      type: number
 *
 *          CreateUserResponse:
 *              type: object
 *              properties:
 *                  id:
 *                      type: string
 *                      format: uuid
 *                  time:
 *                      type: string
 *                      format: date-time
 *                  message:
 *                      type: string
 *
 *          UserRoles:
 *              type: string
 *              enum: [admin,farmer,sysadmin]
 */

/**
 * @openapi
 * '/api/v1.0/public/users':
 *  post:
 *     tags:
 *     - User
 *     summary: Create a new user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              type: object
 *              $ref: '#components/schemas/CreateUserCommand'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#components/schemas/CreateUserResponse'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
userPublicRoute.post('/', UserPublicController.saveUserAsync)

userPublicRoute.patch('/changePassword', UserPublicController.changePasswordUserAsync)

export default userPublicRoute
