import { createRegController, getRegController } from "./../controllers/regController";
import express from "express";


export default (router: express.Router) => {
    router.post("/register", createRegController); // post a user
    router.get("/register/:email", getRegController); // get a user by email 
};