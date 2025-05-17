import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "defaultSecret";

declare module "express-serve-static-core" {
  interface Request {
    userId?: string;
  }
}

export const AuthenticatedOnly = (
  req: Request,
  res: Response,
  next: NextFunction
):void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
     res.status(401).json({ message: "Unauthorized: No token provided" });
     return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { _id: string };
    req.userId = decoded._id;
    console.log("User ID", req.userId)
    console.log("Decoded ID", decoded)
    next();
  } catch (error) {
     res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
