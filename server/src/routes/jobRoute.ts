import { createJobController, getAllJobController, getAppliedJobController, getJobController, patchJobController } from './../controllers/jobController';
import express from 'express';

export default (router: express.Router) => {
    router.get("/job", getAllJobController);
    router.post("/job", createJobController);
    router.patch("/job", patchJobController);
    router.get("/job/:id", getJobController);
    router.get("/applied-jobs/:email", getAppliedJobController);
    router.patch("/job/query", getJobController);
    router.patch("/job/riplay", getJobController);
};