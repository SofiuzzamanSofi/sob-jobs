"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByEmailController = exports.updateUserWithRole = exports.signInWithSocial = exports.signIn = exports.signUp = exports.signOut = exports.getMe = void 0;
const userService_1 = require("../service/userService");
const generateToken_1 = require("../utils/token/generateToken");
// get user first time open on browser
const getMe = async (req, res, next) => {
    try {
        console.log('get-me-user:');
        const email = req.user?.email; // Access the user object from req
        const user = await (0, userService_1.getUserByEmail)(next, email);
        if (!user.email) {
            return res.status(201).json({
                success: false,
                message: `Function called but no user data foundby the email: ${email}`,
                data: { email, }
            });
        }
        else {
            //  console.log('get-me-user:', user);
            const { createdAt, updatedAt, __v, ...others } = user.toObject();
            return res.status(200).json({
                success: true,
                message: `Successfully got data by this: ${email}`,
                data: user,
            });
        }
        ;
    }
    catch (error) {
        next(error);
    }
    ;
};
exports.getMe = getMe;
// signOut || clearCookie
const signOut = async (req, res, next) => {
    try {
        //  console.log('HITTED log out controller:');
        res.clearCookie('userAccessToken');
        return res.status(201).json({
            success: true,
            message: "Log out success."
        });
    }
    catch (error) {
        next(error);
    }
    ;
};
exports.signOut = signOut;
// signUp
const signUp = async (req, res, next) => {
    try {
        const handleUserData = req.body;
        console.log("hit- signUp:");
        if (!handleUserData) {
            return res.status(400).json({
                success: false,
                message: "Body is empty line 12",
            });
        }
        ;
        const user = await (0, userService_1.createUserService)(next, handleUserData);
        if (!user.email) {
            return res.status(400).json({
                success: false,
                message: `Function called but User not set on Db `,
            });
        }
        else {
            //TOKEN
            const token = (0, generateToken_1.generateToken)({ email: user.email });
            const { createdAt, updatedAt, __v, ...others } = user.toObject();
            return res.status(201)
                .cookie("userAccessToken", token, {
                    //  httpOnly: true,
                    // secure: true,
                    // sameSite: "strict",
                    // domain: domailUrl,
                }).json({
                    success: true,
                    data: others,
                });
        }
    }
    catch (error) {
        next(error);
    }
    ;
};
exports.signUp = signUp;
// signIn
const signIn = async (req, res, next) => {
    try {
        const handleUserData = req.body;
        console.log("hit- signIn:");
        if (!handleUserData) {
            return res.status(400).json({
                success: false,
                message: "Body is empty line 12",
            });
        }
        ;
        // get user form DB
        const user = await (0, userService_1.getUserByEmail)(next, handleUserData.email);
        if (user.email) {
            // generate token
            const token = (0, generateToken_1.generateToken)({ email: user.email, role: user?.role });
            const { createdAt, updatedAt, __v, ...others } = user.toObject();
            return res.status(201)
                .cookie("userAccessToken", token, {
                    //  httpOnly: true,
                    // secure: true,
                    // sameSite: "strict",
                    // domain: domailUrl,
                }).json({
                    success: true,
                    data: others,
                });
        }
        else {
            // first time on DB
            const user = await (0, userService_1.createUserService)(next, handleUserData);
            const token = (0, generateToken_1.generateToken)({ email: user.email });
            const { createdAt, updatedAt, __v, ...others } = user.toObject();
            return res.status(201)
                .cookie("userAccessToken", token, {
                    //  httpOnly: true,
                    // secure: true,
                    // sameSite: "strict",
                    // domain: domailUrl,
                }).json({
                    success: true,
                    data: others,
                });
        }
        ;
    }
    catch (error) {
        next(error);
    }
    ;
};
exports.signIn = signIn;
// signIn social
const signInWithSocial = async (req, res, next) => {
    try {
        const handleUserData = req.body;
        console.log("hit- signInWithSocial:");
        if (!handleUserData) {
            return res.status(400).json({
                success: false,
                message: "Body is empty line 12",
            });
        }
        ;
        const user = await (0, userService_1.getUserByEmail)(next, handleUserData.email);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: `Function called but User not set on Db `,
            });
        }
        else {
            // generate token
            const token = (0, generateToken_1.generateToken)({ email: user.email, role: user?.role });
            return res.status(201)
                .cookie("userAccessToken", token, {
                    httpOnly: true,
                    secure: true,
                    // sameSite: "strict",
                    // domain: domailUrl,
                }).json({
                    success: true,
                    data: user,
                });
        }
    }
    catch (error) {
        next(error);
    }
    ;
};
exports.signInWithSocial = signInWithSocial;
// edit user with  role and other info
const updateUserWithRole = async (req, res, next) => {
    try {
        const handleUserData = req.body;
        console.log("hit- updateUserWithRole:");
        if (!handleUserData) {
            return res.status(400).json({
                success: false,
                message: "Body is empty line 12",
            });
        }
        ;
        const user = await (0, userService_1.updateUserByEmail)(next, handleUserData);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: `Function called but User not set on Db `,
            });
        }
        else {
            // generate token
            const token = (0, generateToken_1.generateToken)({ email: user.email, role: user.role });
            return res.status(201)
                .cookie("userAccessToken", token, {
                    //  httpOnly: true,
                    secure: true,
                    // sameSite: "strict",
                    // domain: domailUrl,
                }).json({
                    success: true,
                    data: user,
                });
        }
    }
    catch (error) {
        next(error);
    }
    ;
};
exports.updateUserWithRole = updateUserWithRole;
// get a user by email 
const getUserByEmailController = async (req, res, next) => {
    try {
        const email = req.params?.email;
        //  console.log("hit- getUserByEmailController:");
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Body is empty line 12",
            });
        }
        ;
        const user = await (0, userService_1.getUserByEmail)(next, email);
        if (!user) {
            return res.status(201).json({
                success: false,
                message: `Function called but no user data foundby the email: ${email}`,
                data: { email, }
            });
        }
        else {
            return res.status(201).send({
                success: true,
                message: `Successfully got data by this: ${email}`,
                data: user,
            });
        }
        ;
    }
    catch (error) {
        next(error);
    }
    ;
};
exports.getUserByEmailController = getUserByEmailController;
//# sourceMappingURL=userController.js.map