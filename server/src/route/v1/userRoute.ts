import verifyToken from "../../middleware/verifyToken";
import { signUp, getMe, getUserController, signOut, signIn, registrationController } from "../../controller/userController";
import express from "express";

export default (router: express.Router) => {

    // user parsist || user ke dhore rakha for open browser
    router.get("/user/me", verifyToken, getMe);

    router.get("/user/signout", signOut); // sign out user 

    router.post("/user/signup", signUp); // sign out user 
    router.post("/user/sigin", signIn); // sign out user 

    router.put("/user/registration", registrationController); // // edit user with  role and other info

    router.get("/user/:email", getUserController); // get a user by email 
    router.get("/user/applicant/:email", getUserController); // get a APPLICANT/user by email

};