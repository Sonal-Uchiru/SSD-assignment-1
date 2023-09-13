import { Router } from 'express'
import CategoryController from '../../controllers/protected/CategoryController'

const categoryRoute = Router()

categoryRoute.post('/', CategoryController.saveCategoryAsync)

categoryRoute.get('/list', CategoryController.getCategoryListAsync)

categoryRoute.get('/:id/subcategories', CategoryController.getSubCategoriesByCategoryAsync)

categoryRoute.get('/userFavourtie', CategoryController.getUserFavouriteCategoriesAsync)

categoryRoute.put('/userFavourtie', CategoryController.addCategoryUserFavouriteAsync)

export default categoryRoute
