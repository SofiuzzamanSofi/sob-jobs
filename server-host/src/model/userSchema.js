"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
//create a schema
const userSchema = new mongoose_1.default.Schema({
    firstName: {
        type: "string",
        required: false,
    },
    lastName: {
        type: "string",
        required: false,
    },
    email: {
        type: "string",
        required: true,
        unique: true,
    },
    role: {
        type: "string",
        required: false,
    },
    gender: {
        type: "string",
        required: false,
    },
    country: {
        type: "string",
        required: false,
    },
    address: {
        type: "string",
        required: false,
    },
    city: {
        type: "string",
        required: false,
    },
    postcode: {
        type: "string",
        required: false,
    },
    companyName: {
        type: "string",
        required: false,
    },
    companyCategory: {
        type: "string",
        required: false,
    },
    employeeRange: {
        type: "string",
        required: false,
    },
    roleInCompany: {
        type: "string",
        required: false,
    },
    term: {
        type: Boolean,
        required: false,
    },
}, {
    timestamps: true, // for time save by default
});
// Create a modal
exports.UserModel = mongoose_1.default.model("User", userSchema);
//# sourceMappingURL=userSchema.js.map