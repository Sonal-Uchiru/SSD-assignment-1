import { Request, Response } from 'express'
import { QueryParams } from '../types/QueryParams'
import { HttpStatusCode } from '../types/enum/HttpStatuCodes'
import { BaseValidation } from '../validations/BaseValidation'
import { validatorAsync } from '../validations/Validator'
import { ListCultivationMethodResponse } from '../types/cultivation_method/v1/query/ListCultivationMethodResponse'
import { CreateCultivationMonthCommand } from '../types/cultivation_month/v1/command/create/CreateCultivationMonthCommand'
import { CreateCultivationMonthResponse } from '../types/cultivation_month/v1/command/create/CreateCultivationMonthResponse'
import { createCultivationMonthValidationSchema } from '../validations/cultivation_month/v1/CreateCultivationMonthValidation'
import CultivationMonthRepository from '../repositories/CultivationMonthRepository'

class CultivationMonthService {
    async saveCultivationMonthAsync(
        req: Request,
        res: Response
    ): Promise<Response> {
        try {
            const validation: BaseValidation = await validatorAsync(
                req.body,
                createCultivationMonthValidationSchema
            )

            if (!validation.isValid) {
                return res
                    .status(HttpStatusCode.BAD_REQUEST)
                    .send({ message: validation.message })
            }

            const newCultivationMonths = req.body.items.map(
                (item: any) =>
                    new CreateCultivationMonthCommand(item.name)
            )

            const content = await CultivationMonthRepository.SaveAsync(
                newCultivationMonths
            )

            if (content)
                res.status(HttpStatusCode.CREATED).send(
                    new CreateCultivationMonthResponse(
                        content.map(i => i._id)
                    )
                )
        } catch (error) {
            res.status(HttpStatusCode.INTERNAL_SERVER).send({
                message: 'Internal server error',
            })
        }
    }

    async getCultivationMonthListAsync(
        req: Request,
        res: Response
    ): Promise<Response> {
        try {
            const params: QueryParams = new QueryParams(
                Number(req.query.limit),
                Number(req.query.offset),
                String(req.query.sort)
            )
            // TODO: initially we can get total count and then get the content (performance)
            const content = await CultivationMonthRepository.GetListAsync(
                params
            )

            if (content) {
                const totalCount =
                    await CultivationMonthRepository.GetListTotalCountAsync()

                return res
                    .status(HttpStatusCode.OK)
                    .send(
                        new ListCultivationMethodResponse(
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

export default new CultivationMonthService()
