import { agent as request } from "supertest"
import app from "../server"
import User from "../models/User"
import DBconnection from "../config/DB";
import { Mongoose } from "mongoose";
import UserService from "../services/UserService";
import Task from "../models/Task";
import TaskServices from "../services/TaskService";

const mockUser = {
    email: "mock@mail.com",
    password: "123456",
    name: "mock"
}

const mockTask = {
    "title": "test task",
    "description": "test task",
    "time": new Date(),
    "notificationTime": 10
}

const mockCompletedTask = {
    "title": "completed task",
    "description": "test task",
    "time": new Date(),
    "notificationTime": 10,
    "isCompleted": true
}


let conn: Mongoose;
let token: string;
let taskId: string;
let completedTaskId: string;

beforeAll(async () => {
    conn = await DBconnection()

    await UserService.signup(mockUser)

    const loggedInUser = await UserService.login(mockUser.email, mockUser.password)

    token = loggedInUser.token

    const task = await TaskServices.add(mockTask, loggedInUser.user.id)
    const completdTask = await TaskServices.add(mockCompletedTask, loggedInUser.user.id)

    taskId = task._id;

    completedTaskId = completdTask._id
})

afterAll(async () => {
    await User.deleteMany({})
    await Task.deleteMany({})
    await conn.disconnect()
})

describe("Task Endpoints", () => {
    it('should not create a task when user is not authenticated', async () => {
        const res = await request(app)
            .post('/tasks')
            .set({ 'x-access-token': '' })
            .send({})
        expect(res.statusCode).toEqual(403)
        expect(res.body.message).toEqual('Authentication failed. no token provided')
    })

    it('should not create a task when bad taken is submitted', async () => {
        const res = await request(app)
            .post('/tasks')
            .set({ 'x-access-token': 'fake token' })
            .send({})
        expect(res.statusCode).toEqual(401)
    })

    it('should not create a task when required fields are not passed', async () => {
        const res = await request(app)
            .post('/tasks')
            .set({ 'x-access-token': token })
            .send({
                ...mockTask,
                title: 'jj'
            })
        expect(res.statusCode).toEqual(400)
        expect(res.body).toHaveProperty('message', 'title must be atleast 3 characters')
    })

    it('should not create a task when required fields are not passed', async () => {
        const res = await request(app)
            .post('/tasks')
            .set({ 'x-access-token': token })
            .send({
                ...mockTask,
                description: 'jj'
            })
        expect(res.statusCode).toEqual(400)
        expect(res.body).toHaveProperty('message', 'description must be atleast 3 characters')
    })

    it('should not create a task when required fields are not passed', async () => {
        const res = await request(app)
            .post('/tasks')
            .set({ 'x-access-token': token })
            .send({
                ...mockTask,
                notificationTime: 'jj'
            })
        expect(res.statusCode).toEqual(400)
        expect(res.body).toHaveProperty('message', 'notificationTime must be a number')
    })
    

    it('should not create a task when required fields are not passed', async () => {
        const res = await request(app)
            .post('/tasks')
            .set({ 'x-access-token': token })
            .send({})
        expect(res.statusCode).toEqual(400)
    })

    it('should create a task when user is logged in and required fields submitted', async () => {

        const taskData = {
            "title": "task 1",
            "description": "test task",
            "time": new Date(),
            "notificationTime": 10
        }
        const res = await request(app)
            .post('/tasks')
            .set({ 'x-access-token': token })
            .send(taskData)

        expect(res.statusCode).toEqual(201)
        expect(res.body.data).toHaveProperty('title', taskData.title)
    })

    it('should return 404 when task does not exist', async () => {
        const res = await request(app)
            .get(`/tasks/628422b56e1c62eec3df55eb`)
            .set({ 'x-access-token': token })

        expect(res.statusCode).toEqual(404)
        expect(res.body).toHaveProperty('message', 'Task not found')
    })

    it('should return 200 when task  exist', async () => {
        const res = await request(app)
            .get(`/tasks/${taskId}`)
            .set({ 'x-access-token': token })

        expect(res.statusCode).toEqual(200)
    })

    it('should return a list of available tasks', async () => {
        const res = await request(app)
            .get(`/tasks`)
            .set({ 'x-access-token': token })

        expect(res.statusCode).toEqual(200)
        expect(res.body.data.length).toBeGreaterThan(0)
    })

    it('should update specified task', async () => {

        const taskData = {
            "title": "task 1 updated",
            "description": "test task updated",
            "time": new Date(),
            "notificationTime": 10
        }
        const res = await request(app)
            .put(`/tasks/update/${taskId}`)
            .set({ 'x-access-token': token })
            .send(taskData)

        expect(res.statusCode).toEqual(200)
        expect(res.body.data).toHaveProperty('title', taskData.title)
    })


    it('should not update a completed task', async () => {

        const taskData = {
            "title": "task 1 updated",
            "description": "test task updated",
            "time": new Date(),
            "notificationTime": 10
        }
        const res = await request(app)
            .put(`/tasks/update/${completedTaskId}`)
            .set({ 'x-access-token': token })
            .send(taskData)

        expect(res.statusCode).toEqual(409)
        expect(res.body).toHaveProperty('message', 'Task has been completed')
    })

    it('should mark specified task as completed', async () => {

        const res = await request(app)
            .put(`/tasks/complete/${taskId}`)
            .set({ 'x-access-token': token })

        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('message', 'Task completed successfully')
    })


    it('should return 404 when deleting a task does not exist', async () => {
        const res = await request(app)
            .delete(`/tasks/delete/628422b56e1c62eec3df55eb`)
            .set({ 'x-access-token': token })

        expect(res.statusCode).toEqual(404)
        expect(res.body).toHaveProperty('message', 'Task not found')
    })


    it('should remove a specified task', async () => {
        const res = await request(app)
            .delete(`/tasks/delete/${taskId}`)
            .set({ 'x-access-token': token })

        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('message', 'Task deleted successfully')
    })
})