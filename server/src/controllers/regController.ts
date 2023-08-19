import express from "express";
import { RegSchema } from "../models/regSchema";

// post a user
export const createRegController = async (req: express.Request, res: express.Response) => {
    try {
        const handleRegData = req.body;
        if (!handleRegData) {
            return res.status(400).json({
                success: false,
                message: "Body is empty line 12",
            });
        };
        const createRegisterData = await new RegSchema(handleRegData).save();
        if (!createRegisterData) {
            return res.status(400).json({
                success: false,
                message: `Function called but Reg not set on Db `,
            });
        } else {
            return res.status(201).json({
                success: true,
                data: createRegisterData,
            });
        }
    } catch (error) {
        console.error("Error creating registration:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to create registration",
        });
    }
};

// get a user by email 
export const getRegController = async (req: express.Request, res: express.Response) => {
    const email = req.params?.email as string;
    try {
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Body is empty line 12",
            });
        };
        console.log('email:', email);
        const getUserData = await RegSchema.findOne({ email });
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
        console.error("Error creating registration:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to create registration",
        });
    }
};