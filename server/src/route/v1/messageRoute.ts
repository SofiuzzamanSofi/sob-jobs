import { getAllMessageByIdController, getMessageByIdController, postMessageByIdController } from '../../controller/messageController';
import express from 'express';

export default (router: express.Router) => {
    router.get('/message/:id', getAllMessageByIdController) // get all message by messageId 
    router.get('/message/details/:id', getMessageByIdController) // get 1 message by message id
    router.post('/message/post-message', postMessageByIdController) // post 1 message by message id
};