import { Request, Response } from 'express'
import { QueryParams } from '../types/QueryParams'
import { HttpStatusCode } from '../types/enum/HttpStatuCodes'
import { BaseValidation } from '../validations/BaseValidation'
import { validatorAsync } from '../validations/Validator'
import LocationRepository from '../repositories/LocationRepository'
import { CreateLocationCommand } from '..//types/location/v1/command/create/CreateLocationCommand'
import { CreateLocationResponse } from '..//types/location/v1/command/create/CreateLocationResponse'
import { ListLocationResponse } from '..//types/location/v1/query/ListLocationResponse'
import { createLocationValidationSchema } from '..//validations/location/v1/CreateLocationValidation'

class LocationService {
    async saveLocationAsync(
        req: Request,
        res: Response
    ): Promise<Response> {
        try {
            const validation: BaseValidation = await validatorAsync(
                req.body,
                createLocationValidationSchema
            )

            if (!validation.isValid) {
                return res
                    .status(HttpStatusCode.BAD_REQUEST)
                    .send({ message: validation.message })
            }

            const newLocations = req.body.items.map(
                (item: any) =>
                    new CreateLocationCommand(item.name)
            )

            const content = await LocationRepository.SaveAsync(
                newLocations
            )

            if (content)
                res.status(HttpStatusCode.CREATED).send(
                    new CreateLocationResponse(
                        content.map(i => i._id)
                    )
                )
        } catch (error) {
            res.status(HttpStatusCode.INTERNAL_SERVER).send({
                message: 'Internal server error',
            })
        }
    }

    async getLocationListAsync(
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
            const content = await LocationRepository.GetListAsync(
                params
            )

            if (content) {
                const totalCount =
                    await LocationRepository.GetListTotalCountAsync()

                return res
                    .status(HttpStatusCode.OK)
                    .send(
                        new ListLocationResponse(
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

export default new LocationService()
