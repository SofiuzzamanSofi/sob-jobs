import { createJobController, getAllJobController, getJobController } from './../controllers/jobController';
import express from 'express';

export default (router: express.Router) => {
    router.get("/job", getAllJobController);
    router.post("/job", createJobController);
    router.get("/job/:id", getJobController);
};