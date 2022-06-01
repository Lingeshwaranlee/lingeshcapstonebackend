import express from 'express';
import { createUser } from "../helper1.js";
import bcrypt from 'bcrypt';
const routes = express.Router()
//get a leave

async function genPassword(password){
  const salt= await bcrypt.genSalt(10);
  const hashPassword= await bcrypt.hash(password,salt);//salt+password
  console.log({salt,hashPassword });
  return hashPassword;
}


//create a leave
routes.post("/signup", async function (request, response) {
  const {username,password} = request.body;
  const hashPassword= await genPassword(password);
  const newUser={
    username:username,
    password:hashPassword
  }
  const result = await createUser(newUser);
  response.send(result);
});

export const usersRouter = routes;