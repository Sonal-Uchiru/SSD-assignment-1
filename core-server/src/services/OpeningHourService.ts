import { Request, Response } from 'express'
import OpeningHourRepository from '../repositories/OpeningHourRepository'
import { QueryParams } from '../types/QueryParams'
import { HttpStatusCode } from '../types/enum/HttpStatuCodes'
import { CreateOpeningHourCommand } from '../types/opening_hours/v1/command/create/CreateOpeningHourCommand'
import { CreateOpeningHourResponse } from '../types/opening_hours/v1/command/create/CreateOpeningHourResponse'
import { ListOpeningHoursResponse } from '../types/opening_hours/v1/query/ListOpeningHoursResponse'
import { BaseValidation } from '../validations/BaseValidation'
import { validatorAsync } from '../validations/Validator'
import { createOpeningHourValidationSchema } from '../validations/opening_hours/v1/CreateOpeningHourValidation'

class OpeningHourService {
    async saveOpeningHourAsync(req: Request, res: Response): Promise<Response> {
        try {
            const validation: BaseValidation = await validatorAsync(
                req.body,
                createOpeningHourValidationSchema
            )

            if (!validation.isValid) {
                return res
                    .status(HttpStatusCode.BAD_REQUEST)
                    .send({ message: validation.message })
            }

            const newOpeningHours = req.body.items.map(
                (item: any) =>
                    new CreateOpeningHourCommand(
                        item.openingTime,
                        item.closingTime
                    )
            )

            const content = await OpeningHourRepository.SaveAsync(
                newOpeningHours
            )

            if (content)
                res.status(HttpStatusCode.CREATED).send(
                    new CreateOpeningHourResponse(content.map((i) => i._id))
                )
        } catch (error) {
            res.status(HttpStatusCode.INTERNAL_SERVER).send({
                message: 'Internal server error',
            })
        }
    }

    async getOpeningHourListAsync(
        req: Request,
        res: Response
    ): Promise<Response> {
        try {
            const params: QueryParams = new QueryParams(
                Number(req.query.limit),
                Number(req.query.offset),
                String(req.query.sort)
            )

            const content = await OpeningHourRepository.GetListAsync(params)

            if (content) {
                const totalCount =
                    await OpeningHourRepository.GetListTotalCountAsync()

                return res
                    .status(HttpStatusCode.OK)
                    .send(
                        new ListOpeningHoursResponse(
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
}

export default new OpeningHourService()
