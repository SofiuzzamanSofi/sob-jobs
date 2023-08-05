import express from 'express'
import createRegControllerRoute from "./regRoute"
import createJobControllerRoute from "./jobRoute"

const router = express.Router();

export default (): express.Router => {

    createRegControllerRoute(router);
    createJobControllerRoute(router);
    return router;
};



