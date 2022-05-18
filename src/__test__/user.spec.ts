import request from "supertest"
import app from "../server"
import User from "../models/User"
import DBconnection from "../config/DB";
import { Mongoose } from "mongoose";
import UserService from "../services/UserService";

const mockUser = {
  email: "mock@mail.com",
  password: "123456",
  name: "mock"
}

let conn: Mongoose;

beforeAll(async() => {
  conn = await DBconnection()
  await UserService.signup(mockUser)
})

afterAll(async () => {
  await User.deleteMany({})
  await conn.disconnect()
})

describe('User Endpoints', () => {
  it('should not signup when neccessary field are not supplied', async () => {
    const res = await request(app)
      .post('/auth/signup')
      .send({})
    expect(res.statusCode).toEqual(400)
  })

  it('should not signup when user already exist', async () => {
    const res = await request(app)
      .post('/auth/signup')
      .send(mockUser)
    expect(res.statusCode).toEqual(409)
    expect(res.body.message).toEqual("Email is already been used")
  })

  it('should signup user when neccessary field are supplied', async () => {

    const userData = {
      email: "test@mail.com",
      password: "123456",
      name: "test"
    }
    const res = await request(app)
      .post('/auth/signup')
      .send(userData)
    expect(res.statusCode).toEqual(201)
    expect(res.body).toHaveProperty('status', true)
    expect(res.body.data).toHaveProperty('email', userData.email)
    expect(res.body.data).toHaveProperty('name', userData.name)
  })

  it('should not login without required fields', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({})
    expect(res.statusCode).toEqual(400)
  })

  it('should not login with invalid credentials', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: "fakeail@mail.com",
        password: "98097898"
      })
    expect(res.statusCode).toEqual(401)
    expect(res.body.message).toEqual("Invalid login credentials")
  })

  it('should not login when password is not submitted', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: mockUser.email,
        password: ""
      })
    expect(res.statusCode).toEqual(400)
    expect(res.body.message).toEqual("password is required")
  })

  it('should not login with invalid credentials', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: mockUser.email,
        password: "98097898"
      })
    expect(res.statusCode).toEqual(401)
    expect(res.body.message).toEqual("Invalid login credentials")
  })

  it('should login with correct credentials', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: mockUser.email,
        password: mockUser.password,
      })
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('status', true)
    expect(res.body.data).toHaveProperty('token')
    expect(res.body.data).toHaveProperty('user')
  })
})