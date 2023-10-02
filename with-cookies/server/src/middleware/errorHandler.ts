import express from "express";

export const errorHandler = async (
    err: any, // Corrected the parameter type to 'any'
    req: express.Request,
    res: express.Response,
    next: express.NextFunction // Corrected the parameter type to 'express.NextFunction'
) => {
    try {
        //  console.log('errorHandler middleware called. error:', err);
        return res.status(err?.statusCode || 500).send({
            success: false,
            message: err.message || "Error From Error Handler.",
        });
        // return res.status(err?.statusCode || 404 || 500).send(err.message || "Error From Error Handler.");
    } catch (error) {
        console.error("Error fetching job data:", error);
        return res.status(500).json({
            success: false,
            message: "Failed.",
        });
    }
};