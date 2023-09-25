import { Router } from "express";
import ResearchPaperController from "../../controllers/protected/ResearchPaperController";
import { AuthorizedUserRoles } from "../../middlewares/Authorization";
import { UserRoles } from "../../types/enum/user/UserRoles";

const researchPaperRoute = Router();

researchPaperRoute.post(
  "/",
  AuthorizedUserRoles([UserRoles.Officer]),
  ResearchPaperController.saveResearchPaperAsync
);

researchPaperRoute.put(
  "/:id",
  AuthorizedUserRoles([UserRoles.Officer]),
  ResearchPaperController.updateResearchPaperAsync
);

researchPaperRoute.delete(
  "/:id",
  AuthorizedUserRoles([UserRoles.Officer]),
  ResearchPaperController.deleteResearchPaperAsync
);

researchPaperRoute.get(
  "/list",
  AuthorizedUserRoles([UserRoles.Officer, UserRoles.Farmer]),
  ResearchPaperController.getResearchPaperListAsync
);

researchPaperRoute.get(
  "/subCategories/:id/list",
  AuthorizedUserRoles([UserRoles.Officer, UserRoles.Farmer]),
  ResearchPaperController.getResearchPapersBySubCategoriesAsync
);

researchPaperRoute.get(
  "/:id",
  AuthorizedUserRoles([UserRoles.Officer, UserRoles.Farmer]),
  ResearchPaperController.getResearchPaperAsync
);

export default researchPaperRoute;
