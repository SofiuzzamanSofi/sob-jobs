"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchAnsJobController = exports.patchQuestionJobController = exports.getPostedJobController = exports.getAppliedJobController = exports.patchIsOpenJobController = exports.patchAppliedJobController = exports.postJobController = exports.getOneJobController = exports.getAllJobBySearchTextController = exports.getAllJobController = void 0;
const randomId_1 = require("../utils/randomId/randomId");
const jobService_1 = require("../service/jobService");
// get all jobs 
const getAllJobController = async (req, res, next) => {
    try {
        const { userAccessToken } = req.cookies;
        // console.log("hitted. all jobs")
        // console.log('Cookies: ', req.cookies)
        // console.log('userAccessToken: ', userAccessToken)
        const getJobData = await (0, jobService_1.getAllJobService)(next);
        if (!getJobData) {
            return res.status(200).json({
                success: false,
                message: `Job data not found.`,
            });
        }
        else {
            return res.status(200).json({
                success: true,
                message: "Successfully got all jobs.",
                data: getJobData,
            });
        }
        ;
    }
    catch (error) {
        next(error);
        // console.error("Error fetching job data:", error);
        // return res.status(500).json({
        //     success: false,
        //     message: "Failed to fetch job data",
        // });
    }
    ;
};
exports.getAllJobController = getAllJobController;
// get all jobs By Search Text
const getAllJobBySearchTextController = async (req, res, next) => {
    try {
        const searchData = req.body;
        const query = {};
        if (searchData?.position) {
            query.position = new RegExp(searchData.position, 'i');
        }
        if (searchData?.companyName) {
            query.companyName = new RegExp(searchData.companyName, 'i');
        }
        if (searchData.location) {
            query.location = new RegExp(searchData.location, 'i');
        }
        if (searchData?.isOpen === "open") {
            query.isOpen = true;
        }
        if (searchData?.isOpen === "closed") {
            query.isOpen = false;
        }
        // const targetDate = new Date(new Date());
        // if (searchData?.timestamp === "new") {
        //     query.createdAt = { $gt: targetDate } 
        // }
        // if (searchData?.timestamp === "old") {
        //     query.createdAt = {
        //         $expr: { $lt: ['$createdAt', new Date()] }, // Assuming the field is named createdAt
        //       };
        // }
        // if (searchData?.isNewerJob === true) {
        //     query.createdAt = {
        //       $expr: { $gte: ['$createdAt', new Date()] }, // Assuming the field is named createdAt
        //     };
        //   }
        //   if (searchData?.isNewerJob === false) {
        //     query.createdAt = {
        //       $expr: { $lt: ['$createdAt', new Date()] }, // Assuming the field is named createdAt
        //     };
        //   }
        // console.log('query:', query);
        // Find the MOST RECENT  
        if (searchData?.timestamp === "new") {
            const getRecentJobData = await (0, jobService_1.getAllJobBySearchTextService)(next, query, -1);
            // const getRecentJobData = await JobModel.find(query).sort({ timestamp: -1 });
            if (getRecentJobData.length) {
                return res.status(200).json({
                    success: true,
                    message: "Successfully got all jobs.",
                    data: getRecentJobData,
                });
            }
        }
        // Find the OLDEST 
        if (searchData?.timestamp === "old") {
            const getOldestData = await (0, jobService_1.getAllJobBySearchTextService)(next, query, 1);
            // const getOldestData = await   JobModel.find(query).sort({ timestamp: 1 });
            if (getOldestData.length) {
                return res.status(200).json({
                    success: true,
                    message: "Successfully got all jobs.",
                    data: getOldestData,
                });
            }
        }
        // no f0und anything;
        return res.status(200).json({
            success: false,
            message: `Job data not found.`,
        });
    }
    catch (error) {
        next(error);
        // console.error("Error fetching job data:", error);
        // return res.status(500).json({
        //     success: false,
        //     message: "Failed to fetch job data",
        // });
    }
    ;
};
exports.getAllJobBySearchTextController = getAllJobBySearchTextController;
// get 1 job by id 
const getOneJobController = async (req, res, next) => {
    try {
        const id = req.params?.id;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "id is missing in the request",
            });
        }
        else {
            const getJobData = await (0, jobService_1.getOneJobService)(next, id);
            if (!getJobData) {
                return res.status(200).json({
                    success: false,
                    message: `Job data not found for the id: ${id}`,
                });
            }
            else {
                return res.status(200).json({
                    success: true,
                    message: `Successfully found the job By id: ${id}`,
                    data: getJobData,
                });
            }
            ;
        }
        ;
    }
    catch (error) {
        next(error);
        console.error("Error fetching job data:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch job data",
        });
    }
    ;
};
exports.getOneJobController = getOneJobController;
// post a job 
const postJobController = async (req, res, next) => {
    try {
        const handleJobData = req.body;
        // console.log("handleJobData line 32:", handleJobData);
        if (!handleJobData) {
            return res.status(400).json({
                success: false,
                message: "Body is empty",
            });
        }
        else {
            const createJobData = await (0, jobService_1.postJobService)(next, handleJobData);
            if (!createJobData) {
                return res.status(400).json({
                    success: false,
                    message: "Failed to save job data to the database",
                });
            }
            else {
                return res.status(201).json({
                    success: true,
                    data: createJobData,
                });
            }
            ;
        }
        ;
    }
    catch (error) {
        next(error);
        // console.error("Error creating job:", error);
        // return res.status(500).json({
        //     success: false,
        //     message: "Failed to create job",
        // });
    }
    ;
};
exports.postJobController = postJobController;
// edit job for applicant: APPLIED
const patchAppliedJobController = async (req, res, next) => {
    try {
        const { jobId, userId, userEmail } = req.body;
        // console.log("jobId, userId, userEmail:", jobId, userId, userEmail);
        if (!jobId && !userId && !userEmail) {
            return res.status(400).json({
                success: false,
                message: "userId, jobId, userEmail is missing in the request",
            });
        }
        else {
            const patchJOb = await (0, jobService_1.patchAppliedJobService)(next, jobId, userId, userEmail);
            // const patchJOb = await JobModel.            findByIdAndUpdate(
            //     jobId,
            //     {
            //         $push: {
            //             applicants: {
            //                 userId,
            //                 userEmail,
            //             },
            //         },
            //     },
            //     {
            //         new: true,
            //     }
            // );
            if (!patchJOb) {
                return res.status(200).json({
                    success: false,
                    message: `Job data in not EDIT by the jobId: ${jobId}`,
                });
            }
            else {
                return res.status(200).json({
                    success: true,
                    message: `Successfully EDIT the job by the jobId: ${jobId}`,
                    data: patchJOb,
                });
            }
            ;
        }
        ;
    }
    catch (error) {
        next(error);
        console.error("Error fetching job data:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to PATCH job data",
        });
    }
    ;
};
exports.patchAppliedJobController = patchAppliedJobController;
// edit job for isOpen or closed
const patchIsOpenJobController = async (req, res, next) => {
    try {
        const { jobId, isOpen, userId, userEmail } = req.body;
        if (!jobId || !userId || !userEmail) {
            return res.status(400).json({
                success: false,
                message: "userId, jobId, userEmail is missing in the request",
            });
        }
        else {
            // console.log("jobId isOpen userId userEmail:", jobId, userId, userEmail);
            const jobToUpdate = await (0, jobService_1.patchIsOpenJob1Service)(next, jobId, userEmail, isOpen);
            // const jobToUpdate = await JobModel.findOne({
            //     _id: jobId,
            //     email: userEmail,
            //     isOpen,
            // });
            if (!jobToUpdate) {
                return res.status(404).json({
                    success: false,
                    message: `Job not found with jobId: ${jobId}`,
                });
            }
            if (isOpen === jobToUpdate.isOpen) {
                const updatedIsOpen = !jobToUpdate.isOpen;
                const patchJob = await (0, jobService_1.patchIsOpenJob2Service)(next, jobId, userEmail, updatedIsOpen);
                // const patchJob = await JobModel.findOneAndUpdate(
                //     {
                //         _id: jobId,
                //         email: userEmail,
                //     },
                //     {
                //         $set: {
                //             isOpen: updatedIsOpen,
                //         },
                //     },
                //     {
                //         new: true,
                //     }
                // );
                if (!patchJob) {
                    return res.status(200).json({
                        success: false,
                        message: `Job data was not edited for jobId: ${jobId}`,
                    });
                }
                else {
                    return res.status(200).json({
                        success: true,
                        message: `Successfully edited the job for jobId: ${jobId}`,
                        data: patchJob,
                    });
                }
            }
        }
    }
    catch (error) {
        next(error);
        // console.error("Error fetching job data:", error);
        // return res.status(500).json({
        //     success: false,
        //     message: "Failed to PATCH job data",
        // });
    }
    ;
};
exports.patchIsOpenJobController = patchIsOpenJobController;
// get applied-jobs by email 
const getAppliedJobController = async (req, res, next) => {
    try {
        const email = req.params?.email;
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is missing in the request",
            });
        }
        else {
            // const query = { "applicants.userEmail": email }
            const getAppliedJobData = await (0, jobService_1.getAppliedJobService)(next, email);
            // const getAppliedJobData = await JobModel.find({ "applicants.userEmail": email })
            if (!getAppliedJobData) {
                return res.status(200).json({
                    success: false,
                    message: `Job data not found for the email: ${email}`,
                });
            }
            else {
                return res.status(200).json({
                    success: true,
                    message: `Successfully found the job By id: ${email}`,
                    data: getAppliedJobData,
                });
            }
            ;
        }
        ;
    }
    catch (error) {
        next(error);
        // console.error("Error fetching job data:", error);
        // return res.status(500).json({
        //     success: false,
        //     message: "Failed to fetch job data",
        // });
    }
    ;
};
exports.getAppliedJobController = getAppliedJobController;
// get posted-jobs by email 
const getPostedJobController = async (req, res, next) => {
    try {
        const email = req.params?.email;
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is missing in the request",
            });
        }
        else {
            // const query = { "applicants.userEmail": email }
            const getPostedJobData = await (0, jobService_1.getPostedJobService)(next, email);
            // const getPostedJobData = await JobModel.find({ email })
            if (!getPostedJobData) {
                return res.status(200).json({
                    success: false,
                    message: `Job data not found for the email: ${email}`,
                });
            }
            else {
                return res.status(200).json({
                    success: true,
                    message: `Successfully found the job By id: ${email}`,
                    data: getPostedJobData,
                });
            }
            ;
        }
        ;
    }
    catch (error) {
        next(error);
        // console.error("Error fetching job data:", error);
        // return res.status(500).json({
        //     success: false,
        //     message: "Failed to fetch job data",
        // });
    }
    ;
};
exports.getPostedJobController = getPostedJobController;
// edit job for Question
const patchQuestionJobController = async (req, res, next) => {
    try {
        const { jobId, userId, userEmail, question } = req.body;
        if (!jobId || !userId || !userEmail || !question) {
            return res.status(400).json({
                success: false,
                message: "jobId, userId, userEmail, and question are required in the request body",
            });
        }
        else {
            const questionAns = {
                userId,
                userEmail,
                questionId: (0, randomId_1.generateRandomStringId)(24),
                question: {
                    time: new Date(),
                    questionString: question,
                },
            };
            // console.log("questionAns:", questionAns);
            const updateJobforQuestion = await (0, jobService_1.patchQuestionJobService)(next, jobId, questionAns);
            // const updateJobforQuestion = await JobModel.findByIdAndUpdate(
            //     jobId,
            //     {
            //         $push: {
            //             questionAns,
            //         },
            //     },
            //     {
            //         new: true,
            //     },
            // );
            if (!updateJobforQuestion) {
                return res.status(400).json({
                    success: false,
                    message: `Job with jobId: ${jobId} not found or not updated for question`,
                });
            }
            else {
                return res.status(200).json({
                    success: true,
                    message: `Successfully added question to job with jobId: ${jobId}`,
                    data: updateJobforQuestion,
                });
            }
            ;
        }
        ;
    }
    catch (error) {
        next(error);
        // console.error("Error updating job data for Question:", error);
        // return res.status(404).json({
        //     success: false,
        //     message: "Failed to update job data for Question: catch block",
        // });
    }
    ;
};
exports.patchQuestionJobController = patchQuestionJobController;
// edit job for Ans
const patchAnsJobController = async (req, res, next) => {
    try {
        const { jobId, questionId, userEmail, riplay } = req.body;
        // console.log("jobId, questionId, userEmail, riplay :", jobId, questionId, userEmail, riplay);
        if (!jobId || !questionId || !userEmail || !riplay) {
            return res.status(400).json({
                success: false,
                message: "userId, jobId, userEmail is missing in the request",
            });
        }
        else {
            const ans = {
                time: new Date(),
                ansString: riplay,
            };
            // console.log("ANS DATA:", ans, jobId, questionId, userEmail, riplay);
            const updateJObforAns = await (0, jobService_1.patchAnsJobService)(next, jobId, userEmail, questionId, ans);
            // const updateJObforAns = await JobModel.findOneAndUpdate(
            //     {
            //         _id: jobId,
            //         email: userEmail,
            //         "questionAns.questionId": questionId,
            //     },
            //     {
            //         $push: {
            //             "questionAns.$.ans": ans,
            //         }
            //     },
            //     {
            //         new: true,
            //     },
            // );
            if (!updateJObforAns) {
                return res.status(200).json({
                    success: false,
                    message: `Job data in not EDIT by the jobId: ${jobId}`,
                });
            }
            else {
                return res.status(200).json({
                    success: true,
                    message: `Successfully EDIT the job by the jobId: ${jobId}`,
                    data: updateJObforAns,
                });
            }
            ;
        }
        ;
    }
    catch (error) {
        next(error);
        // console.error("Error fetching job data:", error);
        // return res.status(500).json({
        //     success: false,
        //     message: "Failed to PATCH ANS job data",
        // });
    }
    ;
};
exports.patchAnsJobController = patchAnsJobController;
//# sourceMappingURL=jobController.js.map