"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (userInfo) => {
    const payload = {
        email: userInfo.email,
        role: userInfo?.role,
    };
    // generate token
    const token = jsonwebtoken_1.default.sign(payload, process.env.TOKEN_SECRET, {
    // expiresIn: "7days",
    });
    return token;
};
exports.generateToken = generateToken;
// // generate token with only email
// export const generateTokenWithEmail = (
//     userInfo: { email: string }
// ) => {
//     const payload = {
//         email: userInfo.email,
//     };
//     // generate token
//     const token = jwt.sign(
//         payload,
//         process.env.TOKEN_SECRET,
//     );
//     return token;
// };
//# sourceMappingURL=generateToken.js.map