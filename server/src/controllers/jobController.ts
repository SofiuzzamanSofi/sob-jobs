import express from "express";
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
        }
    } catch (error) {
        console.error("Error fetching job data:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch job data",
        });
    }
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

        const createJobData = await new JobSchema(handleJobData).save();
        // console.log("handleJobData line 40:", handleJobData);
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
        }
    } catch (error) {
        console.error("Error creating job:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to create job",
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
        }
    } catch (error) {
        console.error("Error fetching job data:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch job data",
        });
    }
};