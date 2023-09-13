import { Request, Response } from 'express'
import { QueryParams } from '../types/QueryParams'
import { HttpStatusCode } from '../types/enum/HttpStatuCodes'
import { BaseValidation } from '../validations/BaseValidation'
import { validatorAsync } from '../validations/Validator'
import SlopeLevelRepository from '../repositories/SlopeLevelRepository'
import { CreateSlopeLevelCommand } from '..//types/slope_level/v1/command/create/CreateSlopeLevelCommand'
import { CreateSlopeLevelResponse } from '..//types/slope_level/v1/command/create/CreateSlopeLevelResponse'
import { ListSlopeLevelResponse } from '..//types/slope_level/v1/query/ListSlopeLevelResponse'
import { createSlopeLevelValidationSchema } from '..//validations/slope_level/v1/CreateSoilLevelValidation'

class SoilLevelService {
    async saveSlopeLevelAsync(req: Request, res: Response): Promise<Response> {
        try {
            const validation: BaseValidation = await validatorAsync(
                req.body,
                createSlopeLevelValidationSchema
            )

            if (!validation.isValid) {
                return res
                    .status(HttpStatusCode.BAD_REQUEST)
                    .send({ message: validation.message })
            }

            const newSlopeLevels = req.body.items.map(
                (item: any) => new CreateSlopeLevelCommand(item.name)
            )

            const content = await SlopeLevelRepository.SaveAsync(newSlopeLevels)

            if (content)
                res.status(HttpStatusCode.CREATED).send(
                    new CreateSlopeLevelResponse(content.map((i) => i._id))
                )
        } catch (error) {
            res.status(HttpStatusCode.INTERNAL_SERVER).send({
                message: 'Internal server error',
            })
        }
    }

    async getSlopeLevelListAsync(
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
            const content = await SlopeLevelRepository.GetListAsync(params)

            if (content) {
                const totalCount =
                    await SlopeLevelRepository.GetListTotalCountAsync()

                return res
                    .status(HttpStatusCode.OK)
                    .send(
                        new ListSlopeLevelResponse(
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

export default new SoilLevelService()
