import { config } from "dotenv";

config();

export const PORT = process.env.PORT || 8080
export const DB_NAME = process.env.DB_NAME;
export const TEST_DB_NAME = process.env.TEST_DB_NAME;
export const APP_SECRET = process.env.APP_SECRET;