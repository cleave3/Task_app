import { Request } from 'express';
import { TaskInput } from '../models/Task';
import ResponseHandler from '../utils/responsehandler';

const { throwError } = ResponseHandler;

export const task = ({ body: { title, description, time, notificationTime } }: Request<any, any, TaskInput>) => {
    if (!title) throwError("title is required");
    if (title.trim().length < 3) throwError("title must be atleast 3 characters");
    if (!description) throwError("description is required");
    if (description.trim().length < 3) throwError("description must be atleast 3 characters");
    if (!time) throwError("time is required");

    if (notificationTime) {
        if (isNaN(Number(notificationTime))) throwError("notificationTime must be a number");
    }
}

export const optionalValidation = ({ body: { title, description, isCompleted, notificationTime } }: Request<any, any, TaskInput>) => {
    if (title) {
        if (title.trim().length < 3) throwError("title must be atleast 3 characters");
    }
    if (description) {
        if (description.trim().length < 3) throwError("description must be atleast 3 characters");
    }
    if (notificationTime) {
        if (isNaN(Number(notificationTime))) throwError("notificationTime must be a number");
    }
    if(isCompleted !== undefined) {
        if(typeof isCompleted !== 'boolean') throwError("isCompleted must be a boolean");
    }
}
