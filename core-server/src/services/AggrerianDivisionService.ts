import { Request, Response } from 'express'
import AggrerianDivisionRepository from '../repositories/AggrerianDivisionRepository'
import { QueryParams } from '../types/QueryParams'
import { CreateAggrerianDivisionCommand } from '../types/aggrerian_division/v1/command/create/CreateAggrerianDivisionCommand'
import { CreateAggrerianDivisionResponse } from '../types/aggrerian_division/v1/command/create/CreateAggrerianDivisionResponse'
import { ListAggrerianDivisionsResponse } from '../types/aggrerian_division/v1/query/ListAggrerianDivisionsResponse'
import { HttpStatusCode } from '../types/enum/HttpStatuCodes'
import { BaseValidation } from '../validations/BaseValidation'
import { validatorAsync } from '../validations/Validator'
import { createAggrerianDivisionValidationSchema } from '../validations/aggrerian_division/v1/CreateAggrerianDivisionValidation'

class AggrerianDivisionService {
    async saveAggrerianDivisionAsync(
        req: Request,
        res: Response
    ): Promise<Response> {
        try {
            const validation: BaseValidation = await validatorAsync(
                req.body,
                createAggrerianDivisionValidationSchema
            )

            if (!validation.isValid) {
                return res
                    .status(HttpStatusCode.BAD_REQUEST)
                    .send({ message: validation.message })
            }

            const newAggrerianDivisions = req.body.items.map(
                (item: any) =>
                    new CreateAggrerianDivisionCommand(item.name, item.code)
            )

            const content = await AggrerianDivisionRepository.SaveAsync(
                newAggrerianDivisions
            )

            if (content)
                res.status(HttpStatusCode.CREATED).send(
                    new CreateAggrerianDivisionResponse(
                        content.map(i => i._id)
                    )
                )
        } catch (error) {
            res.status(HttpStatusCode.INTERNAL_SERVER).send({
                message: 'Internal server error',
            })
        }
    }

    async getAggrerianDivisionListAsync(
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
            const content = await AggrerianDivisionRepository.GetListAsync(
                params
            )

            if (content) {
                const totalCount =
                    await AggrerianDivisionRepository.GetListTotalCountAsync()

                return res
                    .status(HttpStatusCode.OK)
                    .send(
                        new ListAggrerianDivisionsResponse(
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

export default new AggrerianDivisionService()
