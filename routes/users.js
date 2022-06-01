import express from 'express';
import { createUser,getuserByName } from "../helper1.js";
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
routes.post("/login", async function (request, response) {
  const {username,password} = request.body;
  //db.user.findOne({ username:"lee"})
  const userFromDB = await getuserByName(username);
  console.log(userFromDB);
  if(!userFromDB){
    response.status(401).send({message:"invalid credential"})
  }
  else{

    const  storedPassword =userFromDB.password;
    const  isPasswordMatch = await bcrypt.compare(password,storedPassword);
    console.log("isPasswordMatch",isPasswordMatch)
    if(isPasswordMatch){
      response.send({message:'successful login'})
    }
    else{
      response.status(401).send({message:"invalid credential"})
    }
  }

});

export const usersRouter = routes;