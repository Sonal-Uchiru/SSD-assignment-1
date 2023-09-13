import { Router } from 'express'
import NotificationController from '../../controllers/protected/NotificationController'

const notificationRoute = Router()

notificationRoute.get('/list', NotificationController.getNotificationListByUserAsync)

notificationRoute.get('/:id', NotificationController.getNotificationAsync)

notificationRoute.delete('/', NotificationController.deleteNotificationsAsync)

notificationRoute.patch('/:id', NotificationController.updatePreviewStateAsync)

export default notificationRoute
