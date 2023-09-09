import { createUserController, getUserController } from "../../controller/userController";
import express from "express";

export default (router: express.Router) => {
    router.post("/user", createUserController); // post a user
    router.get("/user/:email", getUserController); // get a user by email 
    router.get("/user/applicant/:email", getUserController); // get a APPLICANT/user by email 
};