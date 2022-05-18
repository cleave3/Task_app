import Task, { TaskInput } from "../models/Task";
import ResponseHandler from "../utils/responsehandler";

const { throwError } = ResponseHandler;

class TaskServices {

    static async add(input: TaskInput, userId: string) {
        const task = await Task.create({ ...input, userId })
        return task;
    }

    static async getTask(taskId: string) {
        const task = await Task.findOne({ _id: taskId });
        if (!task) throwError("Task not found", 404)
        return task;
    }

    static async getTasks() {
        const tasks = await Task.find();
        return tasks
    }

    static async updateTask(taskId, input: TaskInput) {
        const task = await this.getTask(taskId)

        if(task.isCompleted) throwError("Task has been completed", 409);

        const updateData = {
            title: input.title || task.title,
            description: input.description || task.description,
            time: input.time || task.time,
            notificationTime: input.notificationTime || task.notificationTime,
            ...(input.isCompleted && { isCompleted: input.isCompleted })
        }

        await Task.findOneAndUpdate({ _id: task._id }, updateData)

        const updatedTask = await this.getTask(taskId)

        return updatedTask;
    }

    static async deleteTask(taskId: string) {
        const task = await this.getTask(taskId);

        const delTask = await Task.findOneAndDelete({ _id: task._id })

        return delTask;
    }
}

export default TaskServices;