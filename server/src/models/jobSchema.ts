import { JobDataTypes } from "interfaceServer.ts/interfaceServer.ts";
import mongoose from "mongoose";

const jobSchema = new mongoose.Schema<JobDataTypes>({
    position: {
        type: String,
        required: false,
    },
    companyName: {
        type: String,
        required: false,
    },
    experience: {
        type: String,
        required: false,
    },
    workLevel: {
        type: String,
        required: false,
    },
    employmentType: {
        type: String,
        required: false,
    },
    location: {
        type: String,
        required: false,
    },
    overview: {
        type: String,
        required: false,
    },
    requirements: {
        type: [String],
        required: false,
    },
    responsibilities: {
        type: [String],
        required: false,
    },
    salaryRange: {
        type: String,
        required: false,
    },
    skills: {
        type: [String],
        required: false,
    },
});

// Create a Mongoose Model for Job
export const JobSchema = mongoose.model("JobSchema", jobSchema);
