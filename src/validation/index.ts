import { NextFunction, Request, Response } from "express";
import ResponseHandler from "../utils/responsehandler";

export default (schema: (args: Request) => void) => (req: Request, res: Response, next: NextFunction) => {
    try {
        schema(req);
        next();
    } catch ({ code, message }) {
        return ResponseHandler.badRequest(res, code || 500, message);
    }
}