import { Router } from "express";
import SoilTypeController from "../../controllers/protected/SoilTypeController";
import { AuthorizedUserRoles } from "../../middlewares/Authorization";
import { UserRoles } from "../../types/enum/user/UserRoles";

const soilTypeRoute = Router();

soilTypeRoute.post(
  "/",
  AuthorizedUserRoles([UserRoles.Officer, UserRoles.Farmer]),
  SoilTypeController.saveSoilTypeAsync
);

soilTypeRoute.get(
  "/list",
  AuthorizedUserRoles([UserRoles.Officer, UserRoles.Farmer]),
  SoilTypeController.getSoilTypeListAsync
);

export default soilTypeRoute;
