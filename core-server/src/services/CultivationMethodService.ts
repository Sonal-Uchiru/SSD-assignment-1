import { Request, Response } from 'express'
import { QueryParams } from '../types/QueryParams'
import { HttpStatusCode } from '../types/enum/HttpStatuCodes'
import { BaseValidation } from '../validations/BaseValidation'
import { validatorAsync } from '../validations/Validator'
import CultivationMethodRepository from '../repositories/CultivationMethodRepository'
import { CreateCultivationMethodCommand } from '../types/cultivation_method/v1/command/create/CreateCultivationMethodCommand'
import { CreateCultivationMethodResponse } from '../types/cultivation_method/v1/command/create/CreateCultivationMethodResponse'
import { ListCultivationMethodResponse } from '../types/cultivation_method/v1/query/ListCultivationMethodResponse'
import { createCultivationMethodValidationSchema } from '../validations/cultivation_method/v1/CreateCultivationMethodValidation'

class CultivationMethodService {
    async saveCultivationMethodAsync(
        req: Request,
        res: Response
    ): Promise<Response> {
        try {
            const validation: BaseValidation = await validatorAsync(
                req.body,
                createCultivationMethodValidationSchema
            )

            if (!validation.isValid) {
                return res
                    .status(HttpStatusCode.BAD_REQUEST)
                    .send({ message: validation.message })
            }

            const newCultivationMethods = req.body.items.map(
                (item: any) =>
                    new CreateCultivationMethodCommand(item.name)
            )

            const content = await CultivationMethodRepository.SaveAsync(
                newCultivationMethods
            )

            if (content)
                res.status(HttpStatusCode.CREATED).send(
                    new CreateCultivationMethodResponse(
                        content.map(i => i._id)
                    )
                )
        } catch (error) {
            res.status(HttpStatusCode.INTERNAL_SERVER).send({
                message: 'Internal server error',
            })
        }
    }

    async getCultivationMethodListAsync(
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
            const content = await CultivationMethodRepository.GetListAsync(
                params
            )

            if (content) {
                const totalCount =
                    await CultivationMethodRepository.GetListTotalCountAsync()

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

export default new CultivationMethodService()
