import express from "express";
import mongoose from "mongoose";
import { UserDataTypes } from "../interfaceServer/interfaceServer.ts";
import { UserModel } from "../model/userSchema";

type NextFunction = express.NextFunction;
type ObjectId = mongoose.Schema.Types.ObjectId;

export const createUserService = async (
    next: NextFunction,
    handleUserData: UserDataTypes
) => {
    try {
        const user = await new UserModel(handleUserData).save();
        return user;
    } catch (error) {
        next(error);
    };
};

export const getUserService = async (
    next: NextFunction,
    email: string,
) => {
    try {
        const user = await UserModel.findOne({ email });
        return user;
    } catch (error) {
        next(error);
    };
};

export const getUserByIdService = async (
    next: NextFunction,
    id: ObjectId | string,
) => {
    try {
        const user = await UserModel.findById(id);
        return user;
    } catch (error) {
        next(error);
    };
};