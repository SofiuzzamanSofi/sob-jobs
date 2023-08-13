import { createJobController, getAllJobController, getAppliedJobController, getJobController, getPostedJobController, patchAnsJobController, patchAppliedJobController, patchQuestionJobController } from './../controllers/jobController';
import express from 'express';

export default (router: express.Router) => {
    router.get("/job", getAllJobController); // get all jobs 
    router.get("/job/:id", getJobController); // get 1 job by id 
    router.post("/job", createJobController); // post a job 
    router.patch("/job", patchAppliedJobController); // edit job for applicant: APPLIED
    router.get("/applied-jobs/:email", getAppliedJobController); // get applied-job by email 
    router.get("/posted-jobs/:email", getPostedJobController); // get posted-job by email 
    router.patch("/job/query", patchQuestionJobController); // edit job for Question
    router.patch("/job/riplay", patchAnsJobController); // edit job for Ans
};