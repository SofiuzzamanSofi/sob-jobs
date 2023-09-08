// import express from "express";
// import mongoose from "mongoose";
// import { MessageSchema } from "../model/messageSchema";
// import { AnsTypes, JobDataTypes, QuestionAnsTypes, getAllJobBySearchTextTypes } from "../interfaceServer/interfaceServer.ts";

// type NextFunction = express.NextFunction;
// type ObjectId = mongoose.Schema.Types.ObjectId;

// export const getAllMessageByIdService = async (
//     next: NextFunction,
//     userFromDatabaseById
// ) => {
//     try {
//         const jobs = await MessageSchema.find({
//             participants: {
//                 $elemMatch: { userId: userFromDatabaseById._id },
//             }
//         });
//         return jobs;
//     } catch (error) {
//         next(error);
//     };
// };
