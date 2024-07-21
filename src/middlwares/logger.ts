import { NextFunction, Request, Response } from "express";

const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(`Request method: ${req.method}`);
  console.log(`Request path: ${req.path}`);
  next();
};

export default logger;
