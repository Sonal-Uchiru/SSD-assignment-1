import { Request, Response } from 'express'
import { JwtPayload } from 'jsonwebtoken'
import { decode } from '../jwt/TokenDecode'
import HarvestPredictionRepository from '../repositories/HarvestPredictionRepository'
import { QueryParams } from '../types/QueryParams'
import { HttpStatusCode } from '../types/enum/HttpStatuCodes'
import { CreateHarvestPredictionCommand } from '../types/harvest_prediction/v1/command/create/CreateHarvestPredictionCommand'
import { CreateHarvestPredictionResponse } from '../types/harvest_prediction/v1/command/create/CreateHarvestPredictionResponse'
import { CreatePredictionFeedbackCommand } from '../types/harvest_prediction/v1/command/create/CreatePredictionFeedbackCommand'
import { CreatePredictionFeedbackResponse } from '../types/harvest_prediction/v1/command/create/CreatePredictionFeedbackResponse'
import { DeleteHarvestPredictionResponse } from '../types/harvest_prediction/v1/command/delete/DeleteHarvestPredictionResponse'
import { HarvestPredictionResponse } from '../types/harvest_prediction/v1/query/HarvestPredictionResponse'
import { ListharvestPredictionResponse } from '../types/harvest_prediction/v1/query/ListHarvestPredictionResponse'
import { BaseValidation } from '../validations/BaseValidation'
import { validatorAsync } from '../validations/Validator'
import { createHarvestPredictionValidation } from '../validations/harvest_prediction/v1/CreateHarvestPredictionValidation'
import { createPredictionFeedbackValidation } from '../validations/harvest_prediction/v1/CreatePredictionFeedbackValidation'

class HarvestPredictionService {
    async saveHarvestPredictionAsync(
        req: Request,
        res: Response
    ): Promise<Response> {
        try {
            const validation: BaseValidation = await validatorAsync(
                req.body,
                createHarvestPredictionValidation
            )

            if (!validation.isValid) {
                return res
                    .status(HttpStatusCode.BAD_REQUEST)
                    .send({ message: validation.message })
            }

            const user: JwtPayload = await decode(req)

            const newHarvestPrediction = new CreateHarvestPredictionCommand(
                req.body.harvestAmount,
                req.body.searchDate,
                req.body.sownAmount,
                req.body.season,
                req.body.district,
                req.body.total,
                req.body.kg,
                req.body.cultivationMethod,
                req.body.cultivationMonth,
                req.body.wastageAmount,
                req.body.unitOfLand,
                req.body.soilType,
                req.body.paddyType,
                req.body.districtType,
                req.body.divisionSecretariats,
                req.body.gramaDivision,
                user._id
            )

            const content = await HarvestPredictionRepository.SaveAsync(
                newHarvestPrediction
            )

            if (content)
                res.status(HttpStatusCode.CREATED).send(
                    new CreateHarvestPredictionResponse(content._id)
                )
        } catch (error) {
            res.status(HttpStatusCode.INTERNAL_SERVER).send({
                message: 'Internal server error',
            })
        }
    }

    async deleteHarvestPredictionAsync(
        req: Request,
        res: Response
    ): Promise<Response> {
        try {
            const harvestPrediction =
                await HarvestPredictionRepository.AnyAsync(req.params.id)

            if (!harvestPrediction) {
                return res
                    .status(HttpStatusCode.NOT_FOUND)
                    .send({ message: 'Harvest Prediction not found' })
            }

            const content = await HarvestPredictionRepository.DeleteAsync(
                req.params.id
            )

            if (content)
                res.status(HttpStatusCode.OK).send(
                    new DeleteHarvestPredictionResponse(content._id)
                )
        } catch (error) {
            res.status(HttpStatusCode.INTERNAL_SERVER).send({
                message: 'Internal server error',
            })
        }
    }

    async submitPredictionFeedBackAsync(
        req: Request,
        res: Response
    ): Promise<Response> {
        try {
            const validation: BaseValidation = await validatorAsync(
                req.body,
                createPredictionFeedbackValidation
            )

            if (!validation.isValid) {
                return res
                    .status(HttpStatusCode.BAD_REQUEST)
                    .send({ message: validation.message })
            }

            const harvestPrediction =
                await HarvestPredictionRepository.AnyAsync(req.params.id)

            if (!harvestPrediction) {
                return res
                    .status(HttpStatusCode.NOT_FOUND)
                    .send({ message: 'Harvest Prediction not found' })
            }

            const newPredictionFeedback = new CreatePredictionFeedbackCommand(
                req.body.actualHarvestedAmount,
                req.body.actualKgAmount,
                req.params.id
            )

            const content =
                await HarvestPredictionRepository.SubmitFeedbackAsync(
                    newPredictionFeedback
                )

            if (content)
                res.status(HttpStatusCode.CREATED).send(
                    new CreatePredictionFeedbackResponse(content._id)
                )
        } catch (error) {
            res.status(HttpStatusCode.INTERNAL_SERVER).send({
                message: 'Internal server error',
            })
        }
    }

    async getHarvestPredictionAsync(
        req: Request,
        res: Response
    ): Promise<Response> {
        try {
            const harvestPrediction =
                await HarvestPredictionRepository.GetHarvestPredictionById(
                    req.params.id
                )

            if (!harvestPrediction) {
                return res
                    .status(HttpStatusCode.NOT_FOUND)
                    .send({ message: 'Harvest Prediction not found' })
            }

            return res
                .status(HttpStatusCode.OK)
                .send(new HarvestPredictionResponse(harvestPrediction))
        } catch (error) {
            res.status(HttpStatusCode.INTERNAL_SERVER).send({
                message: 'Internal server error',
            })
        }
    }

    async getHarvestPredictionListByUserAsync(
        req: Request,
        res: Response
    ): Promise<Response> {
        try {
            const user: JwtPayload = await decode(req)

            const params: QueryParams = new QueryParams(
                Number(req.query.limit),
                Number(req.query.offset),
                String(req.query.sort)
            )
            // TODO: initially we can get total count and then get the content (performance)
            const content =
                await HarvestPredictionRepository.GetListByUserAsync(
                    user._id,
                    params
                )

            if (content) {
                const totalCount =
                    await HarvestPredictionRepository.GetListTotalCountByUserAsync(
                        user._id
                    )

                return res
                    .status(HttpStatusCode.OK)
                    .send(
                        new ListharvestPredictionResponse(
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

export default new HarvestPredictionService()
