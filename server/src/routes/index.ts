import express from 'express'
import createRegControllerRoute from "./regRoute"
import createJobControllerRoute from "./jobRoute"
import createMessageControllerRoute from "./messageRoute"

const router = express.Router();

export default (): express.Router => {

    createRegControllerRoute(router);
    createJobControllerRoute(router);
    createMessageControllerRoute(router);
    return router;
};