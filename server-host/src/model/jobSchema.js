"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
//create a schema
const jobSchema = new mongoose_1.default.Schema({
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
    // applicants: {
    //     type: [mongoose.Schema.Types.Mixed],
    //     required: false,
    // },
    applicants: [
        {
            userId: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: "User",
                required: false,
            },
            userEmail: {
                type: "string",
                required: false,
            },
        }
    ],
    // questionAns: {
    //     type: [mongoose.Schema.Types.Mixed],
    //     required: false,
    // },
    questionAns: [
        {
            userId: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: "User",
                require: false,
            },
            userEmail: {
                type: "string",
                require: false,
            },
            questionId: {
                type: "string",
                require: false,
            },
            question: {
                time: {
                    type: Date,
                    default: new Date(),
                    required: false,
                },
                questionString: {
                    type: "string",
                    required: false,
                },
            },
            ans: [
                {
                    time: {
                        type: Date,
                        default: new Date(),
                        required: false,
                    },
                    ansString: {
                        type: "string",
                        required: false,
                    },
                }
            ]
        }
    ],
    timestamp: {
        type: Date,
        default: Date.now,
    }
}, {
    timestamps: true, // for time save by default
});
// Create a modal
exports.JobModel = mongoose_1.default.model("Job", jobSchema);
//# sourceMappingURL=jobSchema.js.map