"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const verifyToken_1 = __importDefault(require("../../middleware/verifyToken"));
const jobController_1 = require("../../controller/jobController");
exports.default = (router) => {
    // Middleware that applies to all routes below this point
    router.use(verifyToken_1.default);
    router.get("/job", jobController_1.getAllJobController); // get all jobs 
    router.post("/job/search", jobController_1.getAllJobBySearchTextController); // get all jobs By Search Text
    router.get("/job/:id", jobController_1.getOneJobController); // get 1 job by id 
    router.post("/job", jobController_1.postJobController); // post a job 
    router.patch("/job/applied-job", jobController_1.patchAppliedJobController); // edit job for applicant: APPLIED
    router.patch("/job/isopen-job", jobController_1.patchIsOpenJobController); // edit job for isOpen or closed 
    router.get("/applied-jobs/:email", jobController_1.getAppliedJobController); // get applied-job by email 
    router.get("/posted-jobs/:email", jobController_1.getPostedJobController); // get posted-job by email 
    router.patch("/job/query", jobController_1.patchQuestionJobController); // edit job for Question
    router.patch("/job/riplay", jobController_1.patchAnsJobController); // edit job for Ans
};
//# sourceMappingURL=jobRoute.js.map