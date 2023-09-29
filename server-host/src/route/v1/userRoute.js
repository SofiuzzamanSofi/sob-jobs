"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const verifyToken_1 = __importDefault(require("../../middleware/verifyToken"));
const userController_1 = require("../../controller/userController");
const authorization_1 = __importDefault(require("../../middleware/authorization"));
exports.default = (router) => {
    //every toure in this folder is protected by cookie
    // router.use(verifyToken)
    // user parsist || user ke dhore rakha for open browser
    router.post("/user/me", verifyToken_1.default, userController_1.getMe);
    router.get("/user/signout", userController_1.signOut); // sign out user 
    router.post("/user/signup", userController_1.signUp); // sign out user 
    router.post("/user/signin", userController_1.signIn); // sign out user 
    router.post("/user/signin-social-media", userController_1.signInWithSocial); // sign GOOGLE FACEBOOK 
    router.put("/user/registration", verifyToken_1.default, userController_1.updateUserWithRole); // // edit user with  role and other info
    router.get("/user/applicant/:email", verifyToken_1.default, (0, authorization_1.default)("Candidate", "Employer"), userController_1.getUserByEmailController); // get a APPLICANT/user by email
};
//# sourceMappingURL=userRoute.js.map