import { Response } from "express";
import { IRequest } from "../interface/IRequest";
import TaskService from "../services/TaskService";
import ResponseHandler from "../utils/responsehandler";

const { success, badRequest, } = ResponseHandler;

class TaskController {

    static async createTask({ body, user: { userId } }: IRequest, res: Response) {
        try {
            const task = await TaskService.add(body, userId)
            return success(res, 201, task);
        } catch ({ message, code }) {
            return badRequest(res, code || 500, message)
        }
    }

    static async getTask({ params: { taskId } }: IRequest, res: Response) {
        try {
            const task = await TaskService.getTask(taskId)
            return success(res, 200, task);
        } catch ({ message, code }) {
            return badRequest(res, code || 500, message)
        }
    }

    static async getTasks(_: IRequest, res: Response) {
        try {
            const tasks = await TaskService.getTasks()
            return success(res, 200, tasks);
        } catch ({ message, code }) {
            return badRequest(res, code || 500, message)
        }
    }

    static async updateTask({ body, params: { taskId } }: IRequest, res: Response) {
        try {
            const task = await TaskService.updateTask(taskId, body)
            return success(res, 200, task, "Task updated successfully");
        } catch ({ message, code }) {
            return badRequest(res, code || 500, message)
        }
    }

    static async markAsCompleted({ params: { taskId } }: IRequest, res: Response) {
        try {
            const task = await TaskService.updateTask(taskId, { isCompleted: true }, )
            return success(res, 200, task, "Task completed successfully");
        } catch ({ message, code }) {
            return badRequest(res, code || 500, message)
        }
    }

    static async deleteTask({ params: { taskId } }: IRequest, res: Response) {
        try {
            const task = await TaskService.deleteTask(taskId)
            return success(res, 200, task, "Task deleted successfully");
        } catch ({ message, code }) {
            return badRequest(res, code || 500, message)
        }
    }
}

export default TaskController;