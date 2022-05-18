import { Schema, model, Document } from "mongoose";
import { randomUUID } from "crypto"

export interface UserModel extends Document {
    _id?: string;
    id: string;
    name: string;
    email: string;
    password: string;
}

export type UserInput = {
    name?: string;
    email?: string;
    password?: string
}

const User = new Schema({
    id: {
        type: String,
        default: () => randomUUID()
    },
    name: {
        type: String,
        default: null,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        default: null,
    },
}, { timestamps: true });

export default model<UserModel>("User", User);
