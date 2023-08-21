import express from "express";
import { JobSchema } from "../models/jobSchema";
import { generateRandomStringId } from "../randomId/randomId";

// get all jobs 
export const getAllJobController = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const getJobData = await JobSchema.find();
        if (!getJobData) {
            return res.status(200).json({
                success: false,
                message: `Job data not found.`,
            });
        } else {
            return res.status(200).json({
                success: true,
                message: "Successfully got all jobs.",
                data: getJobData,
            });
        };
    } catch (error) {
        console.error("Error fetching job data:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch job data",
        });
    };
};

// get all jobs By Search Text
export const getAllJobBySearchTextController = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const searchData = req.body;

        interface QueryTypes {
            position?: RegExp;
            companyName?: RegExp;
            isOpen?: boolean;
            location?: RegExp;
            experience?: RegExp;
            createdAt?: Date;
            timestamp?: Date;
            // Add other fields from your schema here...
        }

        const query: QueryTypes = {};

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
            const getRecentJobData = await JobSchema.find(query).sort({ timestamp: -1 });
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
            const getOldestData = await JobSchema.find(query).sort({ timestamp: 1 });
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
    } catch (error) {
        console.error("Error fetching job data:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch job data",
        });
    }
};


// get 1 job by id 
export const getJobController = async (req: express.Request, res: express.Response) => {
    try {
        const id = req.params?.id as string;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "id is missing in the request",
            });
        }
        else {
            const getJobData = await JobSchema.findById(id);
            if (!getJobData) {
                return res.status(200).json({
                    success: false,
                    message: `Job data not found for the id: ${id}`,
                });
            } else {
                return res.status(200).json({
                    success: true,
                    message: `Successfully found the job By id: ${id}`,
                    data: getJobData,
                });
            };
        };
    } catch (error) {
        console.error("Error fetching job data:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch job data",
        });
    }
};

// post a job 
export const createJobController = async (
    req: express.Request,
    res: express.Response
) => {
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
            const createJobData = await new JobSchema(handleJobData).save();
            if (!createJobData) {
                return res.status(400).json({
                    success: false,
                    message: "Failed to save job data to the database",
                });
            } else {
                return res.status(201).json({
                    success: true,
                    data: createJobData,
                });
            };
        };
    } catch (error) {
        console.error("Error creating job:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to create job",
        });
    }
};

// edit job for applicant: APPLIED
export const patchAppliedJobController = async (
    req: express.Request,
    res: express.Response
) => {
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
            const patchJOb = await JobSchema.findByIdAndUpdate(
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
            if (!patchJOb) {
                return res.status(200).json({
                    success: false,
                    message: `Job data in not EDIT by the jobId: ${jobId}`,
                });
            } else {
                return res.status(200).json({
                    success: true,
                    message: `Successfully EDIT the job by the jobId: ${jobId}`,
                    data: patchJOb,
                });
            };
        };
    } catch (error) {
        console.error("Error fetching job data:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to PATCH job data",
        });
    };
};

// edit job for isOpen or closed
export const patchIsOpenJobController = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const { jobId, isOpen, userId, userEmail } = req.body;

        if (!jobId || !userId || !userEmail) {
            return res.status(400).json({
                success: false,
                message: "userId, jobId, userEmail is missing in the request",
            });
        } else {
            // console.log("jobId isOpen userId userEmail:", jobId, userId, userEmail);
            const jobToUpdate = await JobSchema.findOne({
                _id: jobId,
                email: userEmail,
                isOpen,
            });

            if (!jobToUpdate) {
                return res.status(404).json({
                    success: false,
                    message: `Job not found with jobId: ${jobId}`,
                });
            }
            if (isOpen === jobToUpdate.isOpen) {
                const updatedIsOpen = !jobToUpdate.isOpen;
                const patchJob = await JobSchema.findOneAndUpdate(
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

                if (!patchJob) {
                    return res.status(200).json({
                        success: false,
                        message: `Job data was not edited for jobId: ${jobId}`,
                    });
                } else {
                    return res.status(200).json({
                        success: true,
                        message: `Successfully edited the job for jobId: ${jobId}`,
                        data: patchJob,
                    });
                }
            }
        }
    } catch (error) {
        console.error("Error fetching job data:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to PATCH job data",
        });
    }
};

// get applied-jobs by email 
export const getAppliedJobController = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const email = req.params?.email as string;
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is missing in the request",
            });
        }
        else {
            // const query = { "applicants.userEmail": email }
            const getAppliedJobData = await JobSchema.find({ "applicants.userEmail": email })
            if (!getAppliedJobData) {
                return res.status(200).json({
                    success: false,
                    message: `Job data not found for the email: ${email}`,
                });
            } else {
                return res.status(200).json({
                    success: true,
                    message: `Successfully found the job By id: ${email}`,
                    data: getAppliedJobData,
                });
            };
        };
    } catch (error) {
        console.error("Error fetching job data:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch job data",
        });
    }
};

// get posted-jobs by email 
export const getPostedJobController = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const email = req.params?.email as string;
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is missing in the request",
            });
        }
        else {
            // const query = { "applicants.userEmail": email }
            const getPostedJobData = await JobSchema.find({ email })
            if (!getPostedJobData) {
                return res.status(200).json({
                    success: false,
                    message: `Job data not found for the email: ${email}`,
                });
            } else {
                return res.status(200).json({
                    success: true,
                    message: `Successfully found the job By id: ${email}`,
                    data: getPostedJobData,
                });
            };
        };
    } catch (error) {
        console.error("Error fetching job data:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch job data",
        });
    }
};

// edit job for Question
export const patchQuestionJobController = async (
    req: express.Request,
    res: express.Response
) => {
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
                questionId: generateRandomStringId(24),
                question: {
                    time: new Date(),
                    questionString: question,
                },
            };
            // console.log("questionAns:", questionAns);
            const updateJobforQuestion = await JobSchema.findByIdAndUpdate(
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
            };
        };
    } catch (error) {
        console.error("Error updating job data for Question:", error);
        return res.status(404).json({
            success: false,
            message: "Failed to update job data for Question: catch block",
        });
    };
};

// edit job for Ans
export const patchAnsJobController = async (
    req: express.Request,
    res: express.Response
) => {
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
            const updateJObforAns = await JobSchema.findOneAndUpdate(
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
            )
            if (!updateJObforAns) {
                return res.status(200).json({
                    success: false,
                    message: `Job data in not EDIT by the jobId: ${jobId}`,
                });
            } else {
                return res.status(200).json({
                    success: true,
                    message: `Successfully EDIT the job by the jobId: ${jobId}`,
                    data: updateJObforAns,
                });
            };
        };
    } catch (error) {
        console.error("Error fetching job data:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to PATCH ANS job data",
        });
    };
};