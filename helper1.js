import { client } from "./index.js";

export async function createUser(data) {
  return await client.db("b30wd").collection("users").insertOne(data);
}
export async function getuserByName(username) {
  return await client.db("b30wd").collection("users").findOne({username:username});
}