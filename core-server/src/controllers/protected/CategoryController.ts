import { Request, Response } from 'express'
import CategoryService from '../../services/CategoryService'

class CategoryController {
    async saveCategoryAsync(req: Request, res: Response): Promise<Response> {
        return await CategoryService.saveCategoryAsync(req, res)
    }

    async getCategoryListAsync(req: Request, res: Response): Promise<Response> {
        return await CategoryService.getCategoryListAsync(req, res)
    }

    async getSubCategoriesByCategoryAsync(req: Request, res: Response): Promise<Response> {
        return await CategoryService.getSubCategoriesByCategoryAsync(req, res)
    }

    async addCategoryUserFavouriteAsync(
        req: Request,
        res: Response
    ): Promise<Response> {
        return await CategoryService.addCategoryUserFavouriteAsync(req, res)
    }

    async getUserFavouriteCategoriesAsync(req: Request, res: Response): Promise<Response> {
        return await CategoryService.getUserFavouriteCategoriesAsync(req, res)
    }
}

export default new CategoryController()
