import { Request, Response, NextFunction } from "express";

export const onlyTeachers = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const role = req.headers.role;

  if (!role) {
    return res.status(401).json({ error: "No role provided" });
  }

  if (role !== "teacher") {
    return res.status(403).json({ error: "Access denied - teachers only" });
  }

  next();
};