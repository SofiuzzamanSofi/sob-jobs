"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postMessageByIdFirstTimeService = exports.postMessageByIdService = exports.getMessageByIdService = exports.getAllMessageByIdService = void 0;
const messageSchema_1 = require("../model/messageSchema");
const getAllMessageByIdService = async (next, _id) => {
    try {
        const jobs = await messageSchema_1.MessageModel.find({
            participants: {
                $elemMatch: {
                    userId: _id
                },
            }
        });
        return jobs;
    }
    catch (error) {
        next(error);
    }
    ;
};
exports.getAllMessageByIdService = getAllMessageByIdService;
const getMessageByIdService = async (next, id) => {
    try {
        const jobs = await messageSchema_1.MessageModel.findOne({
            chatId: id
        });
        return jobs;
    }
    catch (error) {
        next(error);
    }
    ;
};
exports.getMessageByIdService = getMessageByIdService;
const postMessageByIdService = async (next, chatId, message) => {
    try {
        const jobs = await messageSchema_1.MessageModel.findOneAndUpdate({
            chatId: chatId,
        }, {
            $push: {
                messages: message,
            }
        }, {
            new: true, //save new message
        });
        return jobs;
    }
    catch (error) {
        next(error);
    }
    ;
};
exports.postMessageByIdService = postMessageByIdService;
const postMessageByIdFirstTimeService = async (next, chatId, participants, message) => {
    try {
        const jobs = await new messageSchema_1.MessageModel({
            chatId,
            participants,
            messages: [
                {
                    messageId: message.messageId,
                    senderId: message.senderId,
                    senderEmail: message.senderEmail,
                    content: message.content,
                }
            ],
        }).save();
        return jobs;
    }
    catch (error) {
        next(error);
    }
    ;
};
exports.postMessageByIdFirstTimeService = postMessageByIdFirstTimeService;
//# sourceMappingURL=messageService.js.map