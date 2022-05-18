import { NextFunction, Request, Response, Router } from "express";
import ResponseHandler from "../utils/responsehandler";
import userRoute from "./user";
import taskRoute from "./task";

const { badRequest, success } = ResponseHandler;

const router = Router();

router.get("/", (_: Request, res: Response) => success(res, 200));
router.use("/auth", userRoute);
router.use("/tasks", taskRoute);

router.use((_: Request, __: Response, next: NextFunction) => next({ code: 404, message: "Route Not found" }));
router.use((err: any, _: Request, res: Response, next: NextFunction) => {
    badRequest(res, 404, err.message)
    next()
});

export default router;
