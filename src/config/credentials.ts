import { config } from "dotenv";

config();

export const PORT = process.env.PORT || 8080
export const DATABASE_URL = process.env.DATABASE_URL;
export const TEST_DB = process.env.TEST_DB;
export const APP_SECRET = process.env.APP_SECRET;