import { client } from "./index.js";

export async function createUser(data) {
  return await client.db("b30wd").collection("users").insertOne(data);
}
