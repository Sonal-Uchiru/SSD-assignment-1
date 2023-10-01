import { JwtPayload } from "jsonwebtoken";
import { decode } from "../jwt/TokenDecode";
import { UserRoles } from "../types/enum/user/UserRoles";
import { Request, Response, NextFunction } from "express";

export const AuthorizedUserRoles = (roles: UserRoles[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const user: JwtPayload = await decode(req);
    let isAuthorized: boolean = false;

    roles.forEach((role) => {
      if (role == user.role) isAuthorized = true;
    });

    if (isAuthorized) {
      next();
    } else {
      res.status(403).json({ message: "Access forbidden" });
    }
  };
};
