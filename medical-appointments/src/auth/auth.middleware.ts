import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET =
  process.env.JWT_KEY ||
  "519064915bc4d803bb2547bd8ffbb9cf674b9a0fdc863836a05b38acb5120ce7";

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

export const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    if (typeof decoded === "object" && decoded !== null) {
      req.user = {
        id: decoded.id as string,
        role: decoded.role as string,
      };
    }

    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
