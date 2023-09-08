import { createUserController, getUserController } from "../../controller/userController";
import express from "express";

export default (router: express.Router) => {
    router.post("/userister", createUserController); // post a user
    router.get("/userister/:email", getUserController); // get a user by email 
    router.get("/userister/applicant/:email", getUserController); // get a APPLICANT/user by email 
};