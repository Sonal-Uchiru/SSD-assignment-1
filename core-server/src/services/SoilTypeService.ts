import { Request, Response } from 'express'
import { QueryParams } from '../types/QueryParams'
import { HttpStatusCode } from '../types/enum/HttpStatuCodes'
import { BaseValidation } from '../validations/BaseValidation'
import { validatorAsync } from '../validations/Validator'
import SoilTypeRepository from '../repositories/SoilTypeRepository'
import { CreateSoilTypeCommand } from '../types/soil_type/v1/command/create/CreateSoilTypeCommand'
import { CreateSoilTypeResponse } from '../types/soil_type/v1/command/create/CreateSoilTypeResponse'
import { ListSoilTypeResponse } from '../types/soil_type/v1/query/ListSoilTypeResponse'
import { createSoilTypeValidationSchema } from '../validations/soil_type/v1/CreateSoilTypeValidation'

class SoilTypeService {
    async saveSoilTypeAsync(
        req: Request,
        res: Response
    ): Promise<Response> {
        try {
            const validation: BaseValidation = await validatorAsync(
                req.body,
                createSoilTypeValidationSchema
            )

            if (!validation.isValid) {
                return res
                    .status(HttpStatusCode.BAD_REQUEST)
                    .send({ message: validation.message })
            }

            const newSoilTypes = req.body.items.map(
                (item: any) =>
                    new CreateSoilTypeCommand(item.name)
            )

            const content = await SoilTypeRepository.SaveAsync(
                newSoilTypes
            )

            if (content)
                res.status(HttpStatusCode.CREATED).send(
                    new CreateSoilTypeResponse(
                        content.map(i => i._id)
                    )
                )
        } catch (error) {
            res.status(HttpStatusCode.INTERNAL_SERVER).send({
                message: 'Internal server error',
            })
        }
    }

    async getSoilTypeListAsync(
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
            const content = await SoilTypeRepository.GetListAsync(
                params
            )

            if (content) {
                const totalCount =
                    await SoilTypeRepository.GetListTotalCountAsync()

                return res
                    .status(HttpStatusCode.OK)
                    .send(
                        new ListSoilTypeResponse(
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

export default new SoilTypeService()
