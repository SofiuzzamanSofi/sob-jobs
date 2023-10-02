import verifyToken from "../../middleware/verifyToken";
import { signUp, getMe, getUserByEmailController, signOut, signIn, updateUserWithRole, signInWithSocial } from "../../controller/userController";
import express from "express";
import authorization from "../../middleware/authorization";

export default (router: express.Router) => {

    //every toure in this folder is protected by cookie
    // router.use(verifyToken)

    // user parsist || user ke dhore rakha for open browser
    // router.post("/user/me", verifyToken, getMe);
    router.post("/user/me", getMe);

    router.get("/user/signout", signOut); // sign out user 

    router.post("/user/signup", signUp); // sign out user 
    router.post("/user/signin", signIn); // sign out user 
    router.post("/user/signin-social-media", signInWithSocial); // sign GOOGLE FACEBOOK 

    // router.put("/user/registration", verifyToken, updateUserWithRole); // // edit user with  role and other info
    router.put("/user/registration", updateUserWithRole); // // edit user with  role and other info

    // router.get("/user/applicant/:email", verifyToken, authorization("Candidate", "Employer"), getUserByEmailController); // get a APPLICANT/user by email
    router.get("/user/applicant/:email", getUserByEmailController); // get a APPLICANT/user by email

};