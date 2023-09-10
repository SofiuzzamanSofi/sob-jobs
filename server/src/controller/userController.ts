import express from "express";
import { createUserService, getUserService } from "../service/userService";
import { generateToken } from "../utils/token/generateToken";

// get user first time open on browser
export const getMe = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) => {
    try {
        const email = req.user?.email; // Access the user object from req
        const getUserData = await getUserService
            (next, email);
        if (!getUserData) {
            return res.status(201).json({
                success: false,
                message: `Function called but no user data foundby the email: ${email}`,
                data: { email, }
            });
        } else {
            return res.status(200).json({
                success: true,
                message: `Successfully got data by this: ${email}`,
                data: getUserData,
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
        console.log('HITTED log out controller:');
        res.clearCookie('userAccessToken');
        return res.status(201).json({
            success: true,
            message: "Log out success."
        });
    } catch (error) {
        next(error);
    };
};

// post a user
export const signUp = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) => {
    try {
        const handleUserData = req.body;
        if (!handleUserData) {
            return res.status(400).json({
                success: false,
                message: "Body is empty line 12",
            });
        };
        const user = await createUserService(next, handleUserData);
        // const user = await new UserModel(handleUserData).save();
        if (!user) {
            return res.status(400).json({
                success: false,
                message: `Function called but User not set on Db `,
            });
        } else {

            // generate token
            // const tokenData = {email: user.email, role: user.role}
            const token = generateToken({ email: user.email, role: user.role });

            // const { ...userData } = user.toObject();  // mongodb add many things when split a data so .toObject() 
            // const userWithToken = { ...userData, token };
            const domailUrl = `${req.protocol}://${req.get("host")}`
            console.log('token:', token);
            console.log('domailUrl:', domailUrl);
            console.log('req.originalUrl:', req.originalUrl);
            console.log("req.get('User-Agent'):", req.get('User-Agent'));
            return res.status(201)
                .cookie(
                    "userAccessToken",
                    token,
                    {
                        httpOnly: true,
                        secure: true,
                        sameSite: "strict",
                        // domain: domailUrl,
                    }
                ).json({
                    success: true,
                    data: user,
                });
        }
    } catch (error) {
        next(error);
        // console.error("Error creating Useristration:", error);
        // return res.status(500).json({
        //     success: false,
        //     message: "Failed to create Useristration",
        // });
    };
};

// get a user by email 
export const getUserController = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) => {
    try {
        console.log('Hitted-on-get-user:');
        const email = req.params?.email as string;
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Body is empty line 12",
            });
        };
        // console.log('email:', email);
        const getUserData = await getUserService
            (next, email);
        if (!getUserData) {
            return res.status(201).json({
                success: false,
                message: `Function called but no user data foundby the email: ${email}`,
                data: { email, }
            });
        } else {
            return res.status(200).json({
                success: true,
                message: `Successfully got data by this: ${email}`,
                data: getUserData,
            })
        };
    } catch (error) {
        next(error);
        // console.error("Error creating Useristration:", error);
        // return res.status(500).json({
        //     success: false,
        //     message: "Failed to create Useristration",
        // });
    };
};