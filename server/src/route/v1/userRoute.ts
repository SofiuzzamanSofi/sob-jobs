import verifyToken from "../../middleware/verifyToken";
import { signUp, getMe, getUserController, signOut } from "../../controller/userController";
import express from "express";

export default (router: express.Router) => {

    // user parsist || user ke dhore rakha for open browser
    router.get("/user/me", verifyToken, getMe);

    router.get("/user/signout", signOut); // sign out user 

    router.post("/user/signup", signUp); // post a user
    router.get("/user/:email", getUserController); // get a user by email 
    router.get("/user/applicant/:email", getUserController); // get a APPLICANT/user by email

};