import { connect } from "mongoose";
import { DB_NAME, TEST_DB_NAME } from "./credentials";

const ACTIVE_DB = process.env.NODE_ENV === "test" ? TEST_DB_NAME : DB_NAME

const DBconnection = async () => {
  try {
    const conn = await connect(`mongodb://localhost:27017/${ACTIVE_DB}`);
    console.log(`MongoDB connected to ${conn.connection.name} on ${conn.connection.host}`);

    return conn;
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default DBconnection;
