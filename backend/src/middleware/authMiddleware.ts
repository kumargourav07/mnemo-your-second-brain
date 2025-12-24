import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];

  // Accept case-insensitive "Bearer" and tolerate extra whitespace
  const bearerMatch = typeof authHeader === "string" && authHeader.match(/^Bearer\s+(.+)$/i);

  if (!bearerMatch) {
    // Helpful debug log for local development when header is missing or malformed
    console.debug("authMiddleware: missing or malformed Authorization header", {
      authorization: req.headers["authorization"],
      path: req.path,
      method: req.method,
    });

    return res.status(401).json({ message: "Authorization header is missing or malformed" });
  }

  const token = bearerMatch[1];

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as { id?: string };

    if (!decoded.id) {
      return res.status(403).json({ message: "Invalid token payload" });
    }

    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
