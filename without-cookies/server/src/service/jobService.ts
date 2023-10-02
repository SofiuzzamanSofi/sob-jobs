import express from "express";
import mongoose from "mongoose";
import { JobModel } from "../model/jobSchema";
import { AnsTypes, JobDataTypes, QuestionAnsTypes, getAllJobBySearchTextTypes } from "../interfaceServer/interfaceServer.ts";

type NextFunction = express.NextFunction;
type ObjectId = mongoose.Schema.Types.ObjectId;

export const getAllJobService = async (
    next: NextFunction
) => {
    try {
        const jobs = await JobModel.find();
        return jobs;
    } catch (error) {
        next(error);
    };
};

export const getAllJobBySearchTextService = async (
    next: NextFunction,
    query: getAllJobBySearchTextTypes,
    assendingDessending: any
) => {
    try {
        const jobs = await JobModel.find(query)
            .sort({ timestamp: assendingDessending });
        return jobs;
    } catch (error) {
        next(error);
    };
};

export const getOneJobService = async (
    next: NextFunction,
    id: string,
) => {
    try {
        const jobs = await JobModel.findById(id);
        return jobs;
    } catch (error) {
        next(error);
    };
};

export const postJobService = async (
    next: NextFunction,
    handleJobData: JobDataTypes,
) => {
    try {
        const jobs = await new JobModel(handleJobData).save();
        return jobs;
    } catch (error) {
        next(error);
    };
};

export const patchAppliedJobService = async (
    next: NextFunction,
    jobId: ObjectId,
    userId: ObjectId,
    userEmail: string,
) => {
    try {
        const jobs = await JobModel.findByIdAndUpdate(
            jobId,
            {
                $push: {
                    applicants: {
                        userId,
                        userEmail,
                    },
                },
            },
            {
                new: true,
            }
        );
        return jobs;
    } catch (error) {
        next(error);
    };
};

export const patchIsOpenJob1Service = async (
    next: NextFunction,
    jobId: ObjectId,
    userEmail: string,
    isOpen: boolean,
) => {
    try {
        const jobs = await JobModel.findOne({
            _id: jobId,
            email: userEmail,
            isOpen,
        });
        return jobs;
    } catch (error) {
        next(error);
    };
};

export const patchIsOpenJob2Service = async (
    next: NextFunction,
    jobId: ObjectId,
    userEmail: string,
    updatedIsOpen: boolean,
) => {
    try {
        const jobs = await JobModel.findOneAndUpdate(
            {
                _id: jobId,
                email: userEmail,
            },
            {
                $set: {
                    isOpen: updatedIsOpen,
                },
            },
            {
                new: true,
            }
        );
        return jobs;
    } catch (error) {
        next(error);
    };
};

export const getAppliedJobService = async (
    next: NextFunction,
    email: string,
) => {
    try {
        const jobs = await JobModel.find({ "applicants.userEmail": email })
        return jobs;
    } catch (error) {
        next(error);
    };
};

export const getPostedJobService = async (
    next: NextFunction,
    email: string,
) => {
    try {
        const jobs = await JobModel.find({ email })
        return jobs;
    } catch (error) {
        next(error);
    };
};

export const patchQuestionJobService = async (
    next: NextFunction,
    jobId: ObjectId,
    questionAns: QuestionAnsTypes,
) => {
    try {
        const jobs = await JobModel.findByIdAndUpdate(
            jobId,
            {
                $push: {
                    questionAns,
                },
            },
            {
                new: true,
            },
        );
        return jobs;
    } catch (error) {
        next(error);
    };
};

export const patchAnsJobService = async (
    next: NextFunction,
    jobId: ObjectId,
    userEmail: string,
    questionId: string,
    ans: AnsTypes,
) => {
    try {
        const jobs = await JobModel.findOneAndUpdate(
            {
                _id: jobId,
                email: userEmail,
                "questionAns.questionId": questionId,
            },
            {
                $push: {
                    "questionAns.$.ans": ans,
                }
            },
            {
                new: true,
            },
        );
        return jobs;
    } catch (error) {
        next(error);
    };
};
