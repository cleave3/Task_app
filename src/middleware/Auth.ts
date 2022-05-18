import { NextFunction, Response } from 'express';
import { IRequest } from '../interface/IRequest';
import Helper from '../utils/helper';
import ResponseHandler from '../utils/responsehandler';

const { badRequest, throwError } = ResponseHandler;

class Auth {

    static async checkAuth(req: IRequest, res: Response, next: NextFunction) {
        try {
            const accesstoken = req.headers["x-access-token"];

            if (!accesstoken) throwError("Authentication failed. no token provided", 403);

            const decoded: any = Helper.verifyToken(accesstoken as string);

            req.user = decoded;

            next();
        } catch ({ code, message }) {
            return badRequest(res, code || 401, message || "Authentication failed. invalid token")
        }
    }
}

export default Auth;