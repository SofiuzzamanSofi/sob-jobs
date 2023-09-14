import { UserDataTypes } from "../interfaceServer/interfaceServer.ts.js";
import mongoose from "mongoose";

//create a schema
const userSchema = new mongoose.Schema<UserDataTypes>({
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
},
  {
    timestamps: true, // for time save by default
  }
);

// Create a modal
export const UserModel = mongoose.model("User", userSchema);