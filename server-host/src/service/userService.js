"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByIdService = exports.updateUserByEmail = exports.createUserService = exports.getUserByEmail = void 0;
const userSchema_1 = require("../model/userSchema");
//
const getUserByEmail = async (next, email) => {
    try {
        const user = await userSchema_1.UserModel.findOne({ email });
        return user;
    }
    catch (error) {
        next(error);
    }
    ;
};
exports.getUserByEmail = getUserByEmail;
//
const createUserService = async (next, handleUserData) => {
    try {
        const user = await new userSchema_1.UserModel(handleUserData).save();
        return user;
    }
    catch (error) {
        next(error);
    }
    ;
};
exports.createUserService = createUserService;
//
const updateUserByEmail = async (next, handleUserData) => {
    try {
        const user = await userSchema_1.UserModel.findOneAndUpdate({ email: handleUserData.email }, { $set: handleUserData }, { runValidators: true, new: true });
        // console.log('user on update service:', user);
        return user;
    }
    catch (error) {
        next(error);
    }
    ;
};
exports.updateUserByEmail = updateUserByEmail;
// get user by id
const getUserByIdService = async (next, id) => {
    try {
        const user = await userSchema_1.UserModel.findById(id);
        return user;
    }
    catch (error) {
        next(error);
    }
    ;
};
exports.getUserByIdService = getUserByIdService;
//# sourceMappingURL=userService.js.map