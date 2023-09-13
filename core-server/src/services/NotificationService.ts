import { Request, Response } from 'express'
import { JwtPayload } from 'jsonwebtoken'
import { decode } from '../jwt/TokenDecode'
import NotificationRespository from '../repositories/NotificationRespository'
import { QueryParams } from '../types/QueryParams'
import { HttpStatusCode } from '../types/enum/HttpStatuCodes'
import { DeleteNotificationResponse } from '../types/notification/v1/command/delete/DeleteNotificationResponse'
import { ListNotificationResponse } from '../types/notification/v1/query/ListNotificationResponse'
import { NotificationResponse } from '../types/notification/v1/query/NotificationResponse'
import { UpdateNotificationResponse } from '../types/notification/v1/command/update/UpdateNotificationResponse'

class NotificationService {
    async getNotificationListByUserAsync(
        req: Request,
        res: Response
    ): Promise<Response> {
        try {
            const user: JwtPayload = await decode(req)

            const params: QueryParams = new QueryParams(
                Number(req.query.limit),
                Number(req.query.offset),
                String(req.query.sort)
            )

            const content =
                await NotificationRespository.GetNotificationListByUser(
                    user._id,
                    params
                )

            if (content) {
                const totalCount =
                    await NotificationRespository.GetListTotalCountByUserAsync(
                        user._id
                    )

                return res
                    .status(HttpStatusCode.OK)
                    .send(
                        new ListNotificationResponse(
                            content,
                            content.length,
                            totalCount
                        )
                    )
            }
        } catch (error) {
            res.status(HttpStatusCode.INTERNAL_SERVER).send({
                message: 'Internal server error',
            })
        }
    }

    async getNotificationAsync(req: Request, res: Response): Promise<Response> {
        try {
            const notification =
                await NotificationRespository.GetNotificationById(req.params.id)

            if (!notification) {
                return res
                    .status(HttpStatusCode.NOT_FOUND)
                    .send({ message: 'Notification not found' })
            }

            res.status(HttpStatusCode.OK).send(
                new NotificationResponse(notification)
            )
        } catch (error) {
            res.status(HttpStatusCode.INTERNAL_SERVER).send({
                message: 'Internal server error',
            })
        }
    }

    async updatePreviewStateAsync(
        req: Request,
        res: Response
    ): Promise<Response> {
        try {
            const notification =
                await NotificationRespository.GetNotificationById(req.params.id)

            if (!notification) {
                return res
                    .status(HttpStatusCode.NOT_FOUND)
                    .send({ message: 'Notification not found' })
            }

            const content =
                await NotificationRespository.changePreviewStateByIdAsync(
                    req.body.id
                )

            if (content) {
                res.status(HttpStatusCode.OK).send(
                    new UpdateNotificationResponse(content._id)
                )
            }
        } catch (error) {
            res.status(HttpStatusCode.INTERNAL_SERVER).send({
                message: 'Internal server error',
            })
        }
    }

    async deleteNotificationsAsync(
        req: Request,
        res: Response
    ): Promise<Response> {
        try {
            // TODO: validate notification ids
            const content = await NotificationRespository.DeleteAsync(
                req.body.ids
            )

            if (content > 0) {
                return res
                    .status(HttpStatusCode.OK)
                    .send(new DeleteNotificationResponse(content))
            }

            return res
                .status(HttpStatusCode.NOT_FOUND)
                .send({ message: 'Notification not found' })

        } catch (error) {
            res.status(HttpStatusCode.INTERNAL_SERVER).send({
                message: 'Internal server error',
            })
        }
    }
}

export default new NotificationService()
