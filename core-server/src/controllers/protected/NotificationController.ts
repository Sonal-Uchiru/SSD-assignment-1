import { Request, Response } from 'express'
import NotificationService from '../../services/NotificationService'

class NotificationController {
    async getNotificationListByUserAsync(req: Request, res: Response): Promise<Response> {
        return await NotificationService.getNotificationListByUserAsync(req, res)
    }

    async getNotificationAsync(req: Request, res: Response): Promise<Response> {
        return await NotificationService.getNotificationAsync(req, res)
    }

    async deleteNotificationsAsync(req: Request, res: Response): Promise<Response> {
        return await NotificationService.deleteNotificationsAsync(req, res)
    }

    async updatePreviewStateAsync(req: Request, res: Response): Promise<Response> {
        return await NotificationService.updatePreviewStateAsync(req, res)
    }
}

export default new NotificationController()
