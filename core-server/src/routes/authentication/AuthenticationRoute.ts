import { Router } from 'express'
import AuthController from '../../controllers/authentication/AuthenticationController'

const authenticationRoute = Router()

/**
 * @swagger
 *  components:
 *      schemas:
 *          AuthUserBody:
 *              type: object
 *              properties:
 *                  email:
 *                      type: string
 *                      format: email
 *                  password:
 *                      type: string
 *                      format: password
 *
 *          AuthUserResponse:
 *              type: object
 *              properties:
 *                  token:
 *                      type: string
 *                  role:
 *                      type: number
 *                      enum: [admin,farmer,sysadmin]
 *                  time:
 *                      type: string
 *                      format: date-time
 *                  message:
 *                      type: string
 */


/**
 * @openapi
 * '/api/v1.0/auth':
 *  post:
 *     tags:
 *     - Auth
 *     summary: User login
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/AuthUserBody'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#components/schemas/AuthUserResponse'
 *      401:
 *        description: Unauthorized
 *      400:
 *        description: Bad request
 *      404:
 *         description: Content Not found
 */
authenticationRoute.post('/', AuthController.authAsync)

export default authenticationRoute
