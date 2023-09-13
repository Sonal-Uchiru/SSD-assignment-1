import { Request, Response } from 'express'
import { JwtPayload } from 'jsonwebtoken'
import { decode } from '../jwt/TokenDecode'
import CategoryRepository from '../repositories/CategoryRepository'
import { QueryParams } from '../types/QueryParams'
import { CreateCategoryCommand } from '../types/category/v1/command/create/CreateCategoryCommand'
import { ListCategoriesResponse } from '../types/category/v1/query/ListCategoriesResponse'
import { ListSubCategoriesResponse } from '../types/category/v1/query/ListSubCategoriesResponse'
import { UserFavouriteCategoriesResponse } from '../types/category/v1/query/UserFavouriteCategoriesResponse'
import { HttpStatusCode } from '../types/enum/HttpStatuCodes'
import { UpdateFarmerFavouriteCategoryCommand } from '../types/farmer_favourite_category/v1/command/update/UpdateFarmerFavouriteCategoryCommand'
import { UpdateFarmerFavouriteCategoryResponse } from '../types/farmer_favourite_category/v1/command/update/UpdateFarmerFavouriteCategoryResponse'
import { CreateUserResponse } from '../types/user/v1/command/create/CreateUserResponse'
import { BaseValidation } from '../validations/BaseValidation'
import { validatorAsync } from '../validations/Validator'
import { createCategoryValidationSchema } from '../validations/category/v1/CreateCategoryValidation'
import { updateFarmerFavouriteCategoryValidation } from '../validations/category/v1/UpdateFarmerFavouriteCategoryValidation'

class CategoryService {
    async saveCategoryAsync(req: Request, res: Response): Promise<Response> {
        try {
            const validation: BaseValidation = await validatorAsync(
                req.body,
                createCategoryValidationSchema
            )

            if (!validation.isValid) {
                return res
                    .status(HttpStatusCode.BAD_REQUEST)
                    .send({ message: validation.message })
            }

            const newCategory = new CreateCategoryCommand(
                req.body.name,
                req.body.iconUrl,
                req.body.subCategories
            )

            const content = await CategoryRepository.SaveAsync(newCategory)

            if (content)
                res.status(HttpStatusCode.CREATED).send(
                    new CreateUserResponse(content._id)
                )
        } catch (error) {
            res.status(HttpStatusCode.INTERNAL_SERVER).send({
                message: 'Internal server error',
            })
        }
    }

    async getCategoryListAsync(req: Request, res: Response): Promise<Response> {
        try {
            const params: QueryParams = new QueryParams(
                Number(req.query.limit),
                Number(req.query.offset),
                String(req.query.sort)
            )

            const content = await CategoryRepository.GetListAsync(params)

            if (content) {
                const totalCount =
                    await CategoryRepository.GetListTotalCountAsync()

                return res
                    .status(HttpStatusCode.OK)
                    .send(
                        new ListCategoriesResponse(
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

    async getSubCategoriesByCategoryAsync(
        req: Request,
        res: Response
    ): Promise<Response> {
        try {
            const params: QueryParams = new QueryParams(
                Number(req.query.limit),
                Number(req.query.offset),
                String(req.query.sort)
            )

            const category = await CategoryRepository.AnyAsync(
                req.params.id
            )

            if (!category) {
                return res
                    .status(HttpStatusCode.NOT_FOUND)
                    .send({ message: 'Category not found' })
            }

            const content =
                await CategoryRepository.GetSubCategoryListByIdAsync(
                    req.params.id,
                    params
                )

            if (content) {
                const totalCount =
                    await CategoryRepository.GetSubCategoryListTotalCountByIdAsync(
                        req.params.id
                    )

                return res
                    .status(HttpStatusCode.OK)
                    .send(
                        new ListSubCategoriesResponse(
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

    async addCategoryUserFavouriteAsync(
        req: Request,
        res: Response
    ): Promise<Response> {
        try {
            const validation: BaseValidation = await validatorAsync(
                req.body,
                updateFarmerFavouriteCategoryValidation
            )

            if (!validation.isValid) {
                return res
                    .status(HttpStatusCode.BAD_REQUEST)
                    .send({ message: validation.message })
            }

            const category = await CategoryRepository.AnyAsync(
                req.body.categoryId
            )

            if (!category) {
                return res
                    .status(HttpStatusCode.NOT_FOUND)
                    .send({ message: 'Category not found' })
            }

            const userId: JwtPayload = await decode(req)

            const updatedFarmerFavouriteCategory: UpdateFarmerFavouriteCategoryCommand =
                new UpdateFarmerFavouriteCategoryCommand(
                    req.body.categoryId,
                    userId._id
                )

            const content =
                await CategoryRepository.UpdateFarmerFavouriteCategoryByIdAsync(
                    updatedFarmerFavouriteCategory
                )

            if (content) {
                res.status(HttpStatusCode.OK).send(
                    new UpdateFarmerFavouriteCategoryResponse(content._id)
                )
            }
        } catch (error) {
            res.status(HttpStatusCode.INTERNAL_SERVER).send({
                message: 'Internal server error',
            })
        }
    }

    async getUserFavouriteCategoriesAsync(
        req: Request,
        res: Response
    ): Promise<Response> {
        try {
            const userId: JwtPayload = await decode(req)

            const content =
                await CategoryRepository.GetUserFavouriteCategoriesByUserIdAsync(
                    userId._id
                )

            if (content) {
                return res
                    .status(HttpStatusCode.OK)
                    .send(
                        new UserFavouriteCategoriesResponse(
                            content,
                            content.length,
                            content.length
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

export default new CategoryService()
