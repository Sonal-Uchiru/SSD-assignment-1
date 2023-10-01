import { Router } from "express";
import HarvestPredictionController from "../../controllers/protected/HarvestPredictionController";
import { UserRoles } from "../../types/enum/user/UserRoles";
import { AuthorizedUserRoles } from "../../middlewares/Authorization";

const harvestPredictionRoute = Router();

harvestPredictionRoute.post(
  "/",
  AuthorizedUserRoles([UserRoles.Farmer]),
  HarvestPredictionController.saveHarvestPredictionAsync
);

harvestPredictionRoute.get(
  "/list",
  AuthorizedUserRoles([UserRoles.Farmer]),
  HarvestPredictionController.getHarvestPredictionListByUserAsync
);

harvestPredictionRoute.get(
  "/:id",
  AuthorizedUserRoles([UserRoles.Farmer]),
  HarvestPredictionController.getHarvestPredictionAsync
);

harvestPredictionRoute.post(
  "/:id/feedback",
  AuthorizedUserRoles([UserRoles.Farmer]),
  HarvestPredictionController.submitPredictionFeedBackAsync
);

harvestPredictionRoute.delete(
  "/:id",
  AuthorizedUserRoles([UserRoles.Farmer]),
  HarvestPredictionController.deleteHarvestPredictionAsync
);

export default harvestPredictionRoute;
