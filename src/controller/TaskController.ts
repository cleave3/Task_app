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

    static async getTask({ user: { userId }, params: { taskId } }: IRequest, res: Response) {
        try {
            const task = await TaskService.getTask(taskId, userId)
            return success(res, 200, task);
        } catch ({ message, code }) {
            return badRequest(res, code || 500, message)
        }
    }

    static async getTasks({ user: { userId } }: IRequest, res: Response) {
        try {
            const tasks = await TaskService.getTasks(userId)
            return success(res, 200, tasks);
        } catch ({ message, code }) {
            return badRequest(res, code || 500, message)
        }
    }

    static async updateTask({ body, user: { userId }, params: { taskId } }: IRequest, res: Response) {
        try {
            const task = await TaskService.updateTask(taskId, body, userId)
            return success(res, 200, task, "Task updated successfully");
        } catch ({ message, code }) {
            return badRequest(res, code || 500, message)
        }
    }

    static async markAsCompleted({ user: { userId }, params: { taskId } }: IRequest, res: Response) {
        try {
            const task = await TaskService.updateTask(taskId, { isCompleted: true }, userId)
            return success(res, 200, task, "Task completed successfully");
        } catch ({ message, code }) {
            return badRequest(res, code || 500, message)
        }
    }

    static async deleteTask({ user: { userId }, params: { taskId } }: IRequest, res: Response) {
        try {
            const task = await TaskService.deleteTask(taskId, userId)
            return success(res, 200, task, "Task deleted successfully");
        } catch ({ message, code }) {
            return badRequest(res, code || 500, message)
        }
    }
}

export default TaskController;