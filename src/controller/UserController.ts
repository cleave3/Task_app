import { Response } from "express";
import { IRequest } from "../interface/IRequest";
import UserService from "../services/UserService";
import ResponseHandler from "../utils/responsehandler";

const { success, badRequest, } = ResponseHandler;

class UserController {

    static async signup({ body }: IRequest, res: Response) {
        try {
            const signup = await UserService.signup(body)
            return success(res, 201, signup);
        } catch ({ message, code }) {
            return badRequest(res, code || 500, message)
        }
    }

    static async login({ body: { email, password } }: IRequest, res: Response) {
        try {
            const login = await UserService.login(email, password)
            return success(res, 200, login, "login successful");
        } catch ({ message, code }) {
            return badRequest(res, code || 500, message)
        }
    }
}

export default UserController;