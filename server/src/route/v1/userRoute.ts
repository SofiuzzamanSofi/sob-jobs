import verifyToken from "../../middleware/verifyToken";
import { signUp, getMe, getUserControllerByEmail, signOut, signIn, updateUserWithRole, signInWithSocial } from "../../controller/userController";
import express from "express";

export default (router: express.Router) => {

    //every toure in this folder is protected by cookie
    // router.use(verifyToken)

    // user parsist || user ke dhore rakha for open browser
    router.post("/user/me", getMe);

    router.get("/user/signout", signOut); // sign out user 

    router.post("/user/signup", signUp); // sign out user 
    router.post("/user/signin", signIn); // sign out user 
    router.post("/user/signin-social-media", signInWithSocial); // sign GOOGLE FACEBOOK 

    router.put("/user/registration", updateUserWithRole); // // edit user with  role and other info

    router.get("/user/:email", getUserControllerByEmail); // get a user by email 
    router.get("/user/applicant/:email", getUserControllerByEmail); // get a APPLICANT/user by email

};