import jwt from "jsonwebtoken";

export const generateToken = (
    userInfo: { email: string, role: string }
) => {

    const payload = {
        email: userInfo.email,
        role: userInfo.role,
    };

    // generate token
    const token = jwt.sign(
        payload,
        process.env.TOKEN_SECRET,
    );
    return token;
};