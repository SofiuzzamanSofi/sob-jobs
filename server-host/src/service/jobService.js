"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchAnsJobService = exports.patchQuestionJobService = exports.getPostedJobService = exports.getAppliedJobService = exports.patchIsOpenJob2Service = exports.patchIsOpenJob1Service = exports.patchAppliedJobService = exports.postJobService = exports.getOneJobService = exports.getAllJobBySearchTextService = exports.getAllJobService = void 0;
const jobSchema_1 = require("../model/jobSchema");
const getAllJobService = async (next) => {
    try {
        const jobs = await jobSchema_1.JobModel.find();
        return jobs;
    }
    catch (error) {
        next(error);
    }
    ;
};
exports.getAllJobService = getAllJobService;
const getAllJobBySearchTextService = async (next, query, assendingDessending) => {
    try {
        const jobs = await jobSchema_1.JobModel.find(query)
            .sort({ timestamp: assendingDessending });
        return jobs;
    }
    catch (error) {
        next(error);
    }
    ;
};
exports.getAllJobBySearchTextService = getAllJobBySearchTextService;
const getOneJobService = async (next, id) => {
    try {
        const jobs = await jobSchema_1.JobModel.findById(id);
        return jobs;
    }
    catch (error) {
        next(error);
    }
    ;
};
exports.getOneJobService = getOneJobService;
const postJobService = async (next, handleJobData) => {
    try {
        const jobs = await new jobSchema_1.JobModel(handleJobData).save();
        return jobs;
    }
    catch (error) {
        next(error);
    }
    ;
};
exports.postJobService = postJobService;
const patchAppliedJobService = async (next, jobId, userId, userEmail) => {
    try {
        const jobs = await jobSchema_1.JobModel.findByIdAndUpdate(jobId, {
            $push: {
                applicants: {
                    userId,
                    userEmail,
                },
            },
        }, {
            new: true,
        });
        return jobs;
    }
    catch (error) {
        next(error);
    }
    ;
};
exports.patchAppliedJobService = patchAppliedJobService;
const patchIsOpenJob1Service = async (next, jobId, userEmail, isOpen) => {
    try {
        const jobs = await jobSchema_1.JobModel.findOne({
            _id: jobId,
            email: userEmail,
            isOpen,
        });
        return jobs;
    }
    catch (error) {
        next(error);
    }
    ;
};
exports.patchIsOpenJob1Service = patchIsOpenJob1Service;
const patchIsOpenJob2Service = async (next, jobId, userEmail, updatedIsOpen) => {
    try {
        const jobs = await jobSchema_1.JobModel.findOneAndUpdate({
            _id: jobId,
            email: userEmail,
        }, {
            $set: {
                isOpen: updatedIsOpen,
            },
        }, {
            new: true,
        });
        return jobs;
    }
    catch (error) {
        next(error);
    }
    ;
};
exports.patchIsOpenJob2Service = patchIsOpenJob2Service;
const getAppliedJobService = async (next, email) => {
    try {
        const jobs = await jobSchema_1.JobModel.find({ "applicants.userEmail": email });
        return jobs;
    }
    catch (error) {
        next(error);
    }
    ;
};
exports.getAppliedJobService = getAppliedJobService;
const getPostedJobService = async (next, email) => {
    try {
        const jobs = await jobSchema_1.JobModel.find({ email });
        return jobs;
    }
    catch (error) {
        next(error);
    }
    ;
};
exports.getPostedJobService = getPostedJobService;
const patchQuestionJobService = async (next, jobId, questionAns) => {
    try {
        const jobs = await jobSchema_1.JobModel.findByIdAndUpdate(jobId, {
            $push: {
                questionAns,
            },
        }, {
            new: true,
        });
        return jobs;
    }
    catch (error) {
        next(error);
    }
    ;
};
exports.patchQuestionJobService = patchQuestionJobService;
const patchAnsJobService = async (next, jobId, userEmail, questionId, ans) => {
    try {
        const jobs = await jobSchema_1.JobModel.findOneAndUpdate({
            _id: jobId,
            email: userEmail,
            "questionAns.questionId": questionId,
        }, {
            $push: {
                "questionAns.$.ans": ans,
            }
        }, {
            new: true,
        });
        return jobs;
    }
    catch (error) {
        next(error);
    }
    ;
};
exports.patchAnsJobService = patchAnsJobService;
//# sourceMappingURL=jobService.js.map