import { Request, Response } from 'express'
import { JwtPayload } from 'jsonwebtoken'
import { decode } from '../jwt/TokenDecode'
import PaddyFieldRepository from '../repositories/PaddyFieldRepository'
import { QueryParams } from '../types/QueryParams'
import { HttpStatusCode } from '../types/enum/HttpStatuCodes'
import { CreatePaddyFieldCommand } from '../types/paddy_field/v1/command/create/CreatePaddyFieldCommand'
import { CreatePaddyFieldResponse } from '../types/paddy_field/v1/command/create/CreatePaddyFieldResponse'
import { DeletePaddyFieldResponse } from '../types/paddy_field/v1/command/delete/DeletePaddyFieldResponse'
import { ListPaddyFieldResponse } from '../types/paddy_field/v1/query/ListPaddyFieldResponse'
import { PaddyFieldResponse } from '../types/paddy_field/v1/query/PaddyFieldResponse'
import { BaseValidation } from '../validations/BaseValidation'
import { validatorAsync } from '../validations/Validator'
import { createPaddyFieldValidationSchema } from '../validations/paddy_field/v1/CreatePaddyFieldValidation'

class PaddyFieldService {
    async savePaddyFieldAsync(req: Request, res: Response): Promise<Response> {
        try {
            const validation: BaseValidation = await validatorAsync(
                req.body,
                createPaddyFieldValidationSchema
            )

            if (!validation.isValid) {
                return res
                    .status(HttpStatusCode.BAD_REQUEST)
                    .send({ message: validation.message })
            }

            const user: JwtPayload = await decode(req)

            const newPaddyField = new CreatePaddyFieldCommand(
                req.body.name,
                req.body.location,
                req.body.paddyType,
                req.body.slopeLevel,
                req.body.waterIn,
                req.body.waterOut,
                req.body.acres,
                req.body.mapContent,
                req.body.irrigatedMapContent,
                req.body.numberOfIrrigations,
                req.body.spaceBetweenIrrigations,
                user._id
            )

            const content = await PaddyFieldRepository.SaveAsync(newPaddyField)

            if (content)
                res.status(HttpStatusCode.CREATED).send(
                    new CreatePaddyFieldResponse(content._id)
                )
        } catch (error) {
            res.status(HttpStatusCode.INTERNAL_SERVER).send({
                message: 'Internal server error',
            })
        }
    }

    async deletePaddyFieldAsync(
        req: Request,
        res: Response
    ): Promise<Response> {
        try {
            const paddyField = await PaddyFieldRepository.AnyAsync(
                req.params.id
            )

            if (!paddyField) {
                return res
                    .status(HttpStatusCode.NOT_FOUND)
                    .send({ message: 'Paddy Field not found' })
            }

            const content = await PaddyFieldRepository.DeleteAsync(
                req.params.id
            )

            if (content)
                res.status(HttpStatusCode.OK).send(
                    new DeletePaddyFieldResponse(content._id)
                )
        } catch (error) {
            res.status(HttpStatusCode.INTERNAL_SERVER).send({
                message: 'Internal server error',
            })
        }
    }

    async getPaddyFieldAsync(req: Request, res: Response): Promise<Response> {
        try {
            const paddyField = await PaddyFieldRepository.GetPaddyFieldById(
                req.params.id
            )

            if (!paddyField) {
                return res
                    .status(HttpStatusCode.NOT_FOUND)
                    .send({ message: 'Paddy Field not found' })
            }

            return res
                .status(HttpStatusCode.OK)
                .send(new PaddyFieldResponse(paddyField))
        } catch (error) {
            res.status(HttpStatusCode.INTERNAL_SERVER).send({
                message: 'Internal server error',
            })
        }
    }

    async getPaddyListAsync(req: Request, res: Response): Promise<Response> {
        try {
            let content = null
            let totalCount = 0

            const params: QueryParams = new QueryParams(
                Number(req.query.limit),
                Number(req.query.offset),
                String(req.query.sort)
            )

            if (req.query.filteredByUser === "true") {
                const user: JwtPayload = await decode(req)
                content = await PaddyFieldRepository.GetListByUserAsync(
                    user._id,
                    params
                )

                totalCount =
                    await PaddyFieldRepository.GetListTotalCountByUserAsync(
                        user._id
                    )

            } else {
                content = await PaddyFieldRepository.GetListByAsync(params)

                totalCount = await PaddyFieldRepository.GetListTotalCountAsync()
            }

            return res
                .status(HttpStatusCode.OK)
                .send(
                    new ListPaddyFieldResponse(
                        content,
                        content.length,
                        totalCount
                    )
                )
        } catch (error) {
            res.status(HttpStatusCode.INTERNAL_SERVER).send({
                message: 'Internal server error',
            })
        }
    }
}

export default new PaddyFieldService()
