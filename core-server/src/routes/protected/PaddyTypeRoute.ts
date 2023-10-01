import { Router } from "express";
import PaddyTypeController from "../../controllers/protected/PaddyTypeController";
import { AuthorizedUserRoles } from "../../middlewares/Authorization";
import { UserRoles } from "../../types/enum/user/UserRoles";

const paddyTypeRoute = Router();

paddyTypeRoute.post(
  "/",
  AuthorizedUserRoles([UserRoles.Officer, UserRoles.Farmer]),
  PaddyTypeController.savePaddyTypeAsync
);

paddyTypeRoute.get(
  "/list",
  AuthorizedUserRoles([UserRoles.Officer, UserRoles.Farmer]),
  PaddyTypeController.getPaddyTypeListAsync
);

export default paddyTypeRoute;
