import jwt from "jsonwebtoken";

export const generateToken = (
    userInfo: { email: string, role?: string }
) => {

    const payload = {
        email: userInfo.email,
        role: userInfo?.role,
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