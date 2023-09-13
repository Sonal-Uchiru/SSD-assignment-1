import { Request, Response } from 'express'
import { QueryParams } from '../types/QueryParams'
import { HttpStatusCode } from '../types/enum/HttpStatuCodes'
import { BaseValidation } from '../validations/BaseValidation'
import { validatorAsync } from '../validations/Validator'
import PaddyTypeRepository from '../repositories/PaddyTypeRepository'
import { CreatePaddyTypeCommand } from '../types/paddy_type/v1/command/create/CreatePaddyTypeCommand'
import { CreatePaddyTypeResponse } from '../types/paddy_type/v1/command/create/CreatePaddyTypeResponse'
import { ListPaddyTypeResponse } from '../types/paddy_type/v1/query/ListCultivationMethodResponse'
import { createPaddyTypeValidationSchema } from '../validations/paddy_type/v1/CreatePaddyTypeValidation'

class PaddyTypeService {
    async savePaddyTypeAsync(
        req: Request,
        res: Response
    ): Promise<Response> {
        try {
            const validation: BaseValidation = await validatorAsync(
                req.body,
                createPaddyTypeValidationSchema
            )

            if (!validation.isValid) {
                return res
                    .status(HttpStatusCode.BAD_REQUEST)
                    .send({ message: validation.message })
            }

            const newPaddyTypes = req.body.items.map(
                (item: any) =>
                    new CreatePaddyTypeCommand(item.name)
            )

            const content = await PaddyTypeRepository.SaveAsync(
                newPaddyTypes
            )

            if (content)
                res.status(HttpStatusCode.CREATED).send(
                    new CreatePaddyTypeResponse(
                        content.map(i => i._id)
                    )
                )
        } catch (error) {
            res.status(HttpStatusCode.INTERNAL_SERVER).send({
                message: 'Internal server error',
            })
        }
    }

    async getPaddyTypeListAsync(
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
            const content = await PaddyTypeRepository.GetListAsync(
                params
            )

            if (content) {
                const totalCount =
                    await PaddyTypeRepository.GetListTotalCountAsync()

                return res
                    .status(HttpStatusCode.OK)
                    .send(
                        new ListPaddyTypeResponse(
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

export default new PaddyTypeService()
