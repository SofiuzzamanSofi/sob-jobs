import { RegisterDataTypes } from "../interfaceServer/interfaceServer.ts";
import mongoose from "mongoose";

const registerSchema = new mongoose.Schema<RegisterDataTypes>({
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
    required: false,
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
});

// Create a Mongoose Model for Candidate Registration
export const RegSchema = mongoose.model("RegSchema", registerSchema);
