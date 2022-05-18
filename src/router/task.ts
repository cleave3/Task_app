import { Router } from "express";
import Validator from "../validation"
import TaskController from "../controller/TaskController";
import { optionalValidation, task } from "../validation/taskValidation";
import Auth from "../middleware/Auth";

const router = Router();

router.use(Auth.checkAuth)
router.post("/", Validator(task), TaskController.createTask);
router.get("/", TaskController.getTasks);
router.get("/:taskId", TaskController.getTask);
router.put("/update/:taskId", Validator(optionalValidation), TaskController.updateTask);
router.put("/complete/:taskId", TaskController.markAsCompleted);
router.delete("/delete/:taskId", TaskController.deleteTask);

export default router;
