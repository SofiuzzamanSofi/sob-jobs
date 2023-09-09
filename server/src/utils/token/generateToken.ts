import jwt from "jsonwebtoken";

export const getGenerateToken = (
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
        {
            // expiresIn: "7days",
        }
    );
    return token;
};