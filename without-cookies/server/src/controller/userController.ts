import express from "express";
import { createUserService, getUserByEmail, updateUserByEmail } from "../service/userService";
import { generateToken } from "../utils/token/generateToken";

// get user first time open on browser
export const getMe = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) => {
    try {
        console.log('get-me-user:')
        // const email = req.user?.email; // Access the user object from req
        const email = req.body?.email; // Access the user object from req
        const user = await getUserByEmail(next, email);
        if (!user.email) {
            return res.status(201).json({
                success: false,
                message: `Function called but no user data foundby the email: ${email}`,
                data: { email, }
            });
        } else {
            //  console.log('get-me-user:', user);
            const { createdAt, updatedAt, __v, ...others } = user.toObject();
            return res.status(200).json({
                success: true,
                message: `Successfully got data by this: ${email}`,
                data: user,
            })
        };
    } catch (error) {
        next(error);
    };
};

// signOut || clearCookie
export const signOut = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) => {
    try {
        //  console.log('HITTED log out controller:');
        return res.status(201).json({
            success: true,
            message: "Log out success."
        });
    } catch (error) {
        next(error);
    };
};

// signUp
export const signUp = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) => {
    try {
        const handleUserData = req.body;
        // console.log("hit- signUp:");
        if (!handleUserData) {
            return res.status(400).json({
                success: false,
                message: "Body is empty line 12",
            });
        };
        const user = await createUserService(next, handleUserData);
        if (!user.email) {
            return res.status(400).json({
                success: false,
                message: `Function called but User not set on Db `,
            });
        } else {
            const { createdAt, updatedAt, __v, ...others } = user.toObject();
            return res.status(201).json({
                success: true,
                data: others,
            });
        }
    } catch (error) {
        next(error);
    };
};

// signIn
export const signIn = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) => {
    try {
        const handleUserData = req.body;
        // console.log("hit- signIn:");
        if (!handleUserData) {
            return res.status(400).json({
                success: false,
                message: "Body is empty",
            });
        };
        // get user form DB
        const user = await getUserByEmail(next, handleUserData.email);
        if (user.email) {
            const { createdAt, updatedAt, __v, ...others } = user.toObject();
            return res.status(201).json({
                success: true,
                data: others,
            });
        }
        else {
            // first time on DB
            const user = await createUserService(next, handleUserData);
            const { createdAt, updatedAt, __v, ...others } = user.toObject();
            return res.status(201).json({
                success: true,
                data: others,
            });
        };

    } catch (error) {
        next(error);
    };
};

// signIn social
export const signInWithSocial = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) => {
    try {
        const handleUserData = req.body;
        // console.log("hit- signInWithSocial:");
        if (!handleUserData) {
            return res.status(400).json({
                success: false,
                message: "Body is empty line 12",
            });
        };
        const user = await getUserByEmail(next, handleUserData.email);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: `Function called but User not set on Db `,
            });
        } else {
            return res.status(201).json({
                success: true,
                data: user,
            });
        }
    } catch (error) {
        next(error);
    };
};

// edit user with  role and other info
export const updateUserWithRole = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) => {
    try {
        const handleUserData = req.body;
        // console.log("hit- updateUserWithRole:");
        if (!handleUserData) {
            return res.status(400).json({
                success: false,
                message: "Body is empty line 12",
            });
        };
        const user = await updateUserByEmail(next, handleUserData);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: `Function called but User not set on Db `,
            });
        } else {
            return res.status(201).json({
                success: true,
                data: user,
            });
        }
    } catch (error) {
        next(error);
    };
};

// get a user by email 
export const getUserByEmailController = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) => {
    try {
        const email = req.params?.email as string;
        //  console.log("hit- getUserByEmailController:");
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Body is empty line 12",
            });
        };
        const user = await getUserByEmail(next, email);
        if (!user) {
            return res.status(201).json({
                success: false,
                message: `Function called but no user data foundby the email: ${email}`,
                data: { email, }
            });
        } else {
            return res.status(201).send({
                success: true,
                message: `Successfully got data by this: ${email}`,
                data: user,
            })
        };
    } catch (error) {
        next(error);
    };
};