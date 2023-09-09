import jwt from "jsonwebtoken";
import express from 'express';
import { promisify } from "util"; // node core module
// import dotenv from "dotenv"
// dotenv.config();

export default async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
) => {

    try {
        const token = req.headers?.authorization?.split(" ")[1] as string;
        if (!token) {
            return res.status(401).send({ status: false, message: "You are not LogIn.", });
        };

        // jwt verify ()
        const decoded = await jwt.verify(token, process.env.TOKEN_SECRET) as { email: string, role: string };

        req.user = decoded

        next();
    } catch (error) {
        next(error);
    };
};

// global variable || global types declar || global types extends
//Extend the Request interface to include the "user" property
declare global {
    namespace Express {
        interface Request {
            user?: { email: string, role: string }
        }
    }
};