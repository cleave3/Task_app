import { Schema, model, Document } from "mongoose";

export interface TaskModel extends Document {
    _id?: string;
    title: string;
    description: string;
    time: Date
    notificationTime: number
    isCompleted: boolean;
    userId: string;
}

export type TaskInput = {
    title?: string;
    description?: string;
    time?: Date
    notificationTime?: number
    isCompleted?: boolean;
}

const Task = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    time: {
        type: Date,
        default: Date.now
    },
    notificationTime: {
        type: Number,
        default: 10
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
    userId: {
        type: String,
        required: true,
    },
}, { timestamps: true });

export default model<TaskModel>("Task", Task);