import { Request, Response } from 'express'
import CategoryRepository from '../repositories/CategoryRepository'
import ResearchPaperRepository from '../repositories/ResearchPaperRepository'
import { QueryParams } from '../types/QueryParams'
import { HttpStatusCode } from '../types/enum/HttpStatuCodes'
import { CreateResearchPaperCommand } from '../types/research_paper/v1/command/create/CreateResearchPaperCommand'
import { CreateResearchPaperResponse } from '../types/research_paper/v1/command/create/CreateResearchPaperResponse'
import { DeleteResearchPaperResponse } from '../types/research_paper/v1/command/delete/DeleteResearchPaperResponse'
import { UpdateResearchPaperCommand } from '../types/research_paper/v1/command/update/UpdateResearchPaperCommand'
import { UpdateResearchPaperResponse } from '../types/research_paper/v1/command/update/UpdateResearchPaperResponse'
import { ListResearchPaperResponse } from '../types/research_paper/v1/query/ListResearchPaperResponse'
import { ResearchPaperResponse } from '../types/research_paper/v1/query/ResearchPaperResponse'
import { BaseValidation } from '../validations/BaseValidation'
import { validatorAsync } from '../validations/Validator'
import { createResearchPaperValidationSchema } from '../validations/research_paper/v1/CreateResearchPaperValidation'
import { updateResearchPaperValidationSchema } from '../validations/research_paper/v1/UpdateResearchPaperValidation'

class ResearchPaperService {
    async saveResearchPaperAsync(
        req: Request,
        res: Response
    ): Promise<Response> {
        try {
            const validation: BaseValidation = await validatorAsync(
                req.body,
                createResearchPaperValidationSchema
            )

            if (!validation.isValid) {
                return res
                    .status(HttpStatusCode.BAD_REQUEST)
                    .send({ message: validation.message })
            }

            const subCategory = await CategoryRepository.AnySubCategoryAsync(
                req.body.subCategory
            )

            if (!subCategory) {
                return res
                    .status(HttpStatusCode.NOT_FOUND)
                    .send({ message: 'Sub Category not found' })
            }

            const newResearchPaper = new CreateResearchPaperCommand(
                req.body.mediaFileUrl,
                req.body.topic,
                req.body.summerizedContent,
                req.body.subCategory
            )

            const content = await ResearchPaperRepository.SaveAsync(
                newResearchPaper
            )

            if (content) {
                res.status(HttpStatusCode.CREATED).send(
                    new CreateResearchPaperResponse(content._id)
                )
            }
        } catch (error) {
            res.status(HttpStatusCode.INTERNAL_SERVER).send({
                message: 'Internal server error',
            })
        }
    }

    async updateResearchPaperAsync(
        req: Request,
        res: Response
    ): Promise<Response> {
        try {
            const validation: BaseValidation = await validatorAsync(
                req.body,
                updateResearchPaperValidationSchema
            )

            if (!validation.isValid) {
                return res
                    .status(HttpStatusCode.BAD_REQUEST)
                    .send({ message: validation.message })
            }

            const researchPaper = await ResearchPaperRepository.AnyAsync(
                req.params.id
            )

            if (!researchPaper) {
                return res
                    .status(HttpStatusCode.NOT_FOUND)
                    .send({ message: 'Research Paper not found' })
            }

            const subCategory = await CategoryRepository.AnySubCategoryAsync(
                req.body.subCategory
            )

            if (!subCategory) {
                return res
                    .status(HttpStatusCode.NOT_FOUND)
                    .send({ message: 'Sub Category not found' })
            }

            const updatedResearchPaper = new UpdateResearchPaperCommand(
                req.body.mediaFileUrl,
                req.body.topic,
                req.body.summerizedContent,
                req.body.subCategory
            )

            const content = await ResearchPaperRepository.UpdateAsync(
                req.params.id,
                updatedResearchPaper
            )

            if (content) {
                res.status(HttpStatusCode.OK).send(
                    new UpdateResearchPaperResponse(content._id)
                )
            }
        } catch (error) {
            res.status(HttpStatusCode.INTERNAL_SERVER).send({
                message: 'Internal server error',
            })
        }
    }

    async deleteResearchPaperAsync(
        req: Request,
        res: Response
    ): Promise<Response> {
        try {
            const researchPaper = await ResearchPaperRepository.AnyAsync(
                req.params.id
            )

            if (!researchPaper) {
                return res
                    .status(HttpStatusCode.NOT_FOUND)
                    .send({ message: 'Research Paper not found' })
            }

            const content = await ResearchPaperRepository.DeleteAsync(
                req.params.id
            )

            if (content) {
                res.status(HttpStatusCode.OK).send(
                    new DeleteResearchPaperResponse(content._id)
                )
            }
        } catch (error) {
            res.status(HttpStatusCode.INTERNAL_SERVER).send({
                message: 'Internal server error',
            })
        }
    }

    async getResearchPaperListAsync(
        req: Request,
        res: Response
    ): Promise<Response> {
        try {
            const params: QueryParams = new QueryParams(
                Number(req.query.limit),
                Number(req.query.offset),
                String(req.query.sort)
            )

            const subCategoryQuery = req.query.subCategory ? String(req.query.subCategory) : null

            const content = await ResearchPaperRepository.GetListAsync(params, subCategoryQuery)

            if (content) {
                const totalCount =
                    await ResearchPaperRepository.GetListTotalCountAsync()

                return res
                    .status(HttpStatusCode.OK)
                    .send(
                        new ListResearchPaperResponse(
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

    async getResearchPapersBySubCategoriesAsync(
        req: Request,
        res: Response
    ): Promise<Response> {
        try {
            const subCategory = await CategoryRepository.AnySubCategoryAsync(
                req.params.id
            )

            if (!subCategory) {
                return res
                    .status(HttpStatusCode.NOT_FOUND)
                    .send({ message: 'Sub Category not found' })
            }

            const params: QueryParams = new QueryParams(
                Number(req.query.limit),
                Number(req.query.offset),
                String(req.query.sort)
            )

            const content =
                await ResearchPaperRepository.GetResearchPaperListBySubCategory(
                    req.params.id,
                    params
                )

            if (content) {
                const totalCount =
                    await ResearchPaperRepository.GetListTotalCountBySubCategoryAsync(req.params.id)

                return res
                    .status(HttpStatusCode.OK)
                    .send(
                        new ListResearchPaperResponse(
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

    async getResearchPaperAsync(
        req: Request,
        res: Response
    ): Promise<Response> {
        try {
            const researchPaper = await ResearchPaperRepository.GetResearchPaperById(req.params.id)

            if (!researchPaper) {
                return res
                    .status(HttpStatusCode.NOT_FOUND)
                    .send({ message: 'Research Paper not found' })
            }

            res.status(HttpStatusCode.OK).send(new ResearchPaperResponse(researchPaper))

        } catch (error) {
            res.status(HttpStatusCode.INTERNAL_SERVER).send({
                message: 'Internal server error',
            })
        }
    }
}

export default new ResearchPaperService()
