import { Router } from "express";
import UserController from "../../controllers/protected/UserController";
import { AuthorizedUserRoles } from "../../middlewares/Authorization";
import { UserRoles } from "../../types/enum/user/UserRoles";

const userRoute = Router();

userRoute.get(
  "/",
  AuthorizedUserRoles([UserRoles.Officer, UserRoles.Farmer]),
  UserController.getUserAsync
);

userRoute.get(
  "/list",
  AuthorizedUserRoles([UserRoles.Officer, UserRoles.Farmer]),
  UserController.getUserListAsync
);

userRoute.put(
  "/",
  AuthorizedUserRoles([UserRoles.Officer, UserRoles.Farmer]),
  UserController.updateUserAsync
);

userRoute.delete(
  "/",
  AuthorizedUserRoles([UserRoles.Officer, UserRoles.Farmer]),
  UserController.deleteUserAsync
);

userRoute.patch(
  "/changePassword",
  AuthorizedUserRoles([UserRoles.Officer, UserRoles.Farmer]),
  UserController.changePasswordUserAsync
);

export default userRoute;
