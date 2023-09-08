import { getAllMessageById, getMessageById, postMessageById } from '../../controller/messageController';
import express from 'express';

export default (router: express.Router) => {
    router.get('/message/:id', getAllMessageById) // get all message by messageId 
    router.get('/message/details/:id', getMessageById) // get 1 message by message id
    router.post('/message/post-message', postMessageById) // post 1 message by message id
};