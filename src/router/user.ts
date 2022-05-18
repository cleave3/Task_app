import { Router } from "express";
import UserController from "../controller/UserController";
import { register, login } from "../validation/userValidation";
import Validator from "../validation"

const router = Router();

router.post("/signup", Validator(register), UserController.signup);
router.post("/login", Validator(login), UserController.login);

export default router;
