import express from 'express';

// get all message by messageId 
export const getAllMessageById = async (req: express.Request, res: express.Response) => {
    try {

    } catch (error) {
        console.error("Error fetching job data:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch job data",
        });
    };
};

// get 1 message by message id
export const getMessageById = async (req: express.Request, res: express.Response) => {
    try {
        const id = req.params?.id as string;
        const [id1, id2] = id.split("-");
        console.log('id1, id2, id:', id1, id2, id);
        // console.log('id1, id2, id:');

        return res.status(200).json({
            success: false,
            message: `Job data not found for the id: ${id}`,
            // data: data,
        });
    } catch (error) {
        console.error("Error fetching job data:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch job data",
        });
    };
};

// post 1 message by message id

export const postMessageById = async (req: express.Request, res: express.Response) => {
    try {

    } catch (error) {
        console.error("Error fetching job data:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch job data",
        });
    };
};