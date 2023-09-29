"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// import dotenv from "dotenv"
// dotenv.config();
exports.default = async (req, res, next) => {
    try {
        // const token = req.headers?.authorization?.split(" ")[1] as string;
        // const token = req.headers?.cookie.split("=")[1] as string;
        const { userAccessToken } = req.cookies;
        if (!userAccessToken) {
            return res.status(401).send({ status: false, message: "You are not LogIN.", });
        }
        ;
        // jwt verify ()
        const decoded = jsonwebtoken_1.default.verify(userAccessToken, process.env.TOKEN_SECRET);
        // console.log('token-verify-all-req.cookies:', req.cookies);
        // console.log('token-verify-decoded:', decoded);
        // if (decoded.email && decoded.role) {
        if (decoded.email) {
            // attached user with request
            req.user = decoded;
            next();
        }
        else {
            return res.status(401).send({ status: false, message: "Token Expires or Invalid.", });
        }
    }
    catch (error) {
        next(error);
    }
    ;
};
;
//# sourceMappingURL=verifyToken.js.map