import express, { application } from "express";
import { JobSchema } from "../models/jobSchema";

// get all jobs 
export const getAllJobController = async (req: express.Request, res: express.Response) => {
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

// post a job 
export const createJobController = async (req: express.Request, res: express.Response) => {
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

// edit job for applicant 
export const patchJobController = async (req: express.Request, res: express.Response) => {
    try {
        const { jobId, userId, userEmail } = req.body;
        console.log("jobId, userId, userEmail:", jobId, userId, userEmail);
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

// get applied-job by email 
export const getAppliedJobController = async (req: express.Request, res: express.Response) => {
    try {
        const email = req.params?.email as string;
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is missing in the request",
            });
        }
        else {
            const query = { "applicants.userEmail": email }
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