import { connect } from "mongoose";
import { DATABASE_URL, TEST_DB } from "./credentials";

const DB_NAME = process.env.NODE_ENV === "test" ? TEST_DB : DATABASE_URL

const DBconnection = async () => {
  try {
    const conn = await connect(`mongodb://localhost:27017/${DB_NAME}`);
    console.log(`MongoDB connected to ${conn.connection.name} on ${conn.connection.host}`);

    return conn;
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default DBconnection;
