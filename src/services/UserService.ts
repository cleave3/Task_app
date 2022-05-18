import User, { UserInput } from "../models/User";
import Helper from "../utils/helper";
import ResponseHandler from "../utils/responsehandler";

const { throwError } = ResponseHandler;

class UserService {

    static async profile(id: string) {
        return await User.findOne({ id }).select(["-password", "-_id", "-__v"])
    }

    static async signup(input: UserInput) {
        const emailExist = await User.findOne({ email: input.email });

        if (emailExist) throwError("Email is already been used", 409);

        const data = { ...input, password: Helper.genHash(input.password) }

        const createuser = await User.create(data)

        const profile = await UserService.profile(createuser.id);

        return profile;
    }

    static async login(email: string, password: string) {
        const userExist = await User.findOne({ email });

        if (!userExist) throwError("Invalid login credentials", 401);


        if (!Helper.verifyHash(password, userExist.password)) throwError("Invalid login credentials", 401);

        const token = Helper.genToken({ userId: userExist.id });

        const user = await UserService.profile(userExist.id);


        return { token, user }
    }
}

export default UserService;