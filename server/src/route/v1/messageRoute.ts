import express from 'express';
import verifyToken from '../../middleware/verifyToken';
import { getAllMessageByIdController, getMessageByIdController, postMessageByIdController } from '../../controller/messageController';

export default (router: express.Router) => {

    // Middleware that applies to all routes below this point
    // router.use(verifyToken);

    router.get('/message/:id', getAllMessageByIdController) // get all message by messageId 
    router.get('/message/details/:id', getMessageByIdController) // get 1 message by message id
    router.post('/message/post-message', postMessageByIdController) // post 1 message by message id
};