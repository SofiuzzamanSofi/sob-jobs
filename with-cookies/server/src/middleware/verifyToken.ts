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
        // const token = req.headers?.authorization?.split(" ")[1] as string;

        // const token = req.headers?.cookie.split("=")[1] as string;
        const { userAccessToken } = req.cookies

        if (!userAccessToken) {
            return res.status(401).send({ status: false, message: "You are not LogIN.", });
        };

        // jwt verify ()
        const decoded = jwt.verify(userAccessToken, process.env.TOKEN_SECRET) as { email: string, role: string, iat: number };

        // console.log('token-verify-all-req.cookies:', req.cookies);
        // console.log('token-verify-decoded:', decoded);

        // if (decoded.email && decoded.role) {
        if (decoded.email) {
            // attached user with request
            req.user = decoded
            next();
        }
        else {
            return res.status(401).send({ status: false, message: "Token Expires or Invalid.", });
        }
    } catch (error) {
        next(error);
    };
};

// global variable || global types declar || global types extends
//Extend the Request interface to include the "user" property
declare global {
    namespace Express {
        interface Request {
            user?: { email: string, role: string, iat: number }
        }
    }
};