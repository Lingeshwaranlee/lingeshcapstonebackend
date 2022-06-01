import express from "express";
import { MongoClient } from "mongodb";
const app = express();
const PORT=process.env.PORT || 4000;
import { usersRouter } from "./routes/users.js";
app.use(express.json());
import dotenv from "dotenv";
dotenv.config();

const MONGO_URL =process.env.MONGO_URL;
async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("mongo is connected🥰🥰");
  return client;
}
export const client = await createConnection();

//routes
app.use("/users", usersRouter);

app.listen(PORT,()=>console.log(`server started ${PORT}`));