import { Router } from "express";
import CategoryController from "../../controllers/protected/CategoryController";
import { AuthorizedUserRoles } from "../../middlewares/Authorization";
import { UserRoles } from "../../types/enum/user/UserRoles";

const categoryRoute = Router();

categoryRoute.post(
  "/",
  AuthorizedUserRoles([UserRoles.Officer]),
  CategoryController.saveCategoryAsync
);

categoryRoute.get(
  "/list",
  AuthorizedUserRoles([UserRoles.Officer, UserRoles.Farmer]),
  CategoryController.getCategoryListAsync
);

categoryRoute.get(
  "/:id/subcategories",
  AuthorizedUserRoles([UserRoles.Officer, UserRoles.Farmer]),
  CategoryController.getSubCategoriesByCategoryAsync
);

categoryRoute.get(
  "/userFavourtie",
  AuthorizedUserRoles([UserRoles.Farmer]),
  CategoryController.getUserFavouriteCategoriesAsync
);

categoryRoute.put(
  "/userFavourtie",
  AuthorizedUserRoles([UserRoles.Farmer]),
  CategoryController.addCategoryUserFavouriteAsync
);

export default categoryRoute;
