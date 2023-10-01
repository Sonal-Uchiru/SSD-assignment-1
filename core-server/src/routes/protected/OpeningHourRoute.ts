import { Router } from "express";
import OpeningHourController from "../../controllers/protected/OpeningHourController";
import { UserRoles } from "../../types/enum/user/UserRoles";
import { AuthorizedUserRoles } from "../../middlewares/Authorization";

const openingHourRoute = Router();

openingHourRoute.post(
  "/",
  AuthorizedUserRoles([UserRoles.Officer, UserRoles.Farmer]),
  OpeningHourController.saveOpeningHourAsync
);

openingHourRoute.get(
  "/list",
  AuthorizedUserRoles([UserRoles.Officer, UserRoles.Farmer]),
  OpeningHourController.getOpeningHourListAsync
);

export default openingHourRoute;
