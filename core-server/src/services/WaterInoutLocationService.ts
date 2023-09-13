import { Request, Response } from 'express'
import { QueryParams } from '../types/QueryParams'
import { HttpStatusCode } from '../types/enum/HttpStatuCodes'
import { BaseValidation } from '../validations/BaseValidation'
import { validatorAsync } from '../validations/Validator'
import WaterInoutlocationRepository from '..//repositories/WaterInoutLocationRepository'
import { CreateWaterInoutLocationCommand } from '..//types/water_inout_location/v1/command/create/CreateWaterInoutLocationCommand'
import { CreateWaterInoutLocationResponse } from '..//types/water_inout_location/v1/command/create/CreateWaterInoutLocationResponse'
import { createWaterInoutLocationValidationSchema } from '..//validations/water_inout_location/v1/CreateWaterInoutLocationValidation'
import { ListWaterInoutLocationResponse } from '../types/water_inout_location/v1/query/ListWaterInoutLocationResponse'

class WaterInoutLocationService {
    async saveWaterInoutLocationAsync(
        req: Request,
        res: Response
    ): Promise<Response> {
        try {
            const validation: BaseValidation = await validatorAsync(
                req.body,
                createWaterInoutLocationValidationSchema
            )

            if (!validation.isValid) {
                return res
                    .status(HttpStatusCode.BAD_REQUEST)
                    .send({ message: validation.message })
            }

            const newWaterInoutLocations = req.body.items.map(
                (item: any) =>
                    new CreateWaterInoutLocationCommand(item.name)
            )

            const content = await WaterInoutlocationRepository.SaveAsync(
                newWaterInoutLocations
            )

            if (content)
                res.status(HttpStatusCode.CREATED).send(
                    new CreateWaterInoutLocationResponse(
                        content.map(i => i._id)
                    )
                )
        } catch (error) {
            res.status(HttpStatusCode.INTERNAL_SERVER).send({
                message: 'Internal server error',
            })
        }
    }

    async getWaterInoutLocationListAsync(
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
            const content = await WaterInoutlocationRepository.GetListAsync(
                params
            )

            if (content) {
                const totalCount =
                    await WaterInoutlocationRepository.GetListTotalCountAsync()

                return res
                    .status(HttpStatusCode.OK)
                    .send(
                        new ListWaterInoutLocationResponse(
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

export default new WaterInoutLocationService()
