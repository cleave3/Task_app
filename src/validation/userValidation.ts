import { Request } from 'express';
import ResponseHandler from '../utils/responsehandler';

const { throwError } = ResponseHandler;

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const register = ({ body: { name, email, password } }: Request) => {
    if (!name) throwError("name is required");
    if (name.trim().length < 3) throwError("name must be atleast 3 characters");
    if (!email) throwError("email is required");
    if (!EMAIL_REGEX.test(email)) throwError("email is invalid");
    if (!password) throwError("password is required");
    if (password.trim().length < 6) throwError("password must be atleast 6 characters");
}

export const login = ({ body: { email, password } }: Request) => {
    if (!email) throwError("email is required");
    if (!password) throwError("password is required");
}
