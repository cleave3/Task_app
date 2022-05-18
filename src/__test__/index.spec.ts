import { Mongoose } from "mongoose";
import { agent as request } from "supertest"
import DBconnection from "../config/DB";
import app from "../server"

let conn: Mongoose;

beforeAll(async () => {
    conn = await DBconnection()
})

afterAll(async () => {
    await conn.disconnect()
})

describe("App Entry", () => {
    it('Should return a status code of 200', async () => {
        const res = await request(app).get('/')
        expect(res.statusCode).toEqual(200)
      })

      it('Should return a status code of 404 when route does not exist', async () => {
        const res = await request(app).get('/notfound')
        expect(res.statusCode).toEqual(404)
        expect(res.body).toHaveProperty('message', 'Route Not found')
      })
})