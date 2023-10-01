import { Router } from "express";
import NotificationController from "../../controllers/protected/NotificationController";
import { AuthorizedUserRoles } from "../../middlewares/Authorization";
import { UserRoles } from "../../types/enum/user/UserRoles";

const notificationRoute = Router();

notificationRoute.get(
  "/list",
  AuthorizedUserRoles([UserRoles.Farmer]),
  NotificationController.getNotificationListByUserAsync
);

notificationRoute.get(
  "/:id",
  AuthorizedUserRoles([UserRoles.Farmer]),
  NotificationController.getNotificationAsync
);

notificationRoute.delete(
  "/",
  AuthorizedUserRoles([UserRoles.Farmer]),
  NotificationController.deleteNotificationsAsync
);

notificationRoute.patch(
  "/:id",
  AuthorizedUserRoles([UserRoles.Farmer]),
  NotificationController.updatePreviewStateAsync
);

export default notificationRoute;
