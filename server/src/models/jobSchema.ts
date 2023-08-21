import { JobDataTypes } from "interfaceServer.ts/interfaceServer.ts";
import mongoose from "mongoose";

const jobSchema = new mongoose.Schema<JobDataTypes>({
    email: {
        type: "string",
        required: false,
    },
    position: {
        type: "string",
        required: false,
    },
    companyName: {
        type: "string",
        required: false,
    },
    experience: {
        type: "string",
        required: false,
    },
    workLevel: {
        type: "string",
        required: false,
    },
    employmentType: {
        type: "string",
        required: false,
    },
    location: {
        type: "string",
        required: false,
    },
    noOpening: {
        type: "string",
        required: true,
    },
    isOpen: {
        type: "boolean",
        required: true,
    },
    overview: {
        type: "string",
        required: false,
    },
    requirements: {
        type: ["string"],
        required: false,
    },
    responsibilities: {
        type: ["string"],
        required: false,
    },
    salaryRange: {
        type: "string",
        required: false,
    },
    skills: {
        type: ["string"],
        required: false,
    },
    applicants: {
        type: [mongoose.Schema.Types.Mixed],
        required: false,
    },
    questionAns: {
        type: [mongoose.Schema.Types.Mixed],
        required: false,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    }
});

// Create a Mongoose Model for Job
export const JobSchema = mongoose.model("JobSchema", jobSchema);
