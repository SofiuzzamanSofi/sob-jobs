import express from "express";
import { createUserService, getUserService } from "../service/userService";

// post a user
export const createUserController = async (
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
        const createUseristerData = await createUserService(next, handleUserData);
        // const createUseristerData = await new UserModel(handleUserData).save();
        if (!createUseristerData) {
            return res.status(400).json({
                success: false,
                message: `Function called but User not set on Db `,
            });
        } else {
            return res.status(201).json({
                success: true,
                data: createUseristerData,
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