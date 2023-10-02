import express from "express";
import mongoose from "mongoose";
import { MessageModel } from '../model/messageSchema';
import { Participant, postMessageByIdServiceType } from "../interfaceServer/interfaceServer.ts";

type NextFunction = express.NextFunction;
type ObjectId = mongoose.Schema.Types.ObjectId;

export const getAllMessageByIdService = async (
    next: NextFunction,
    _id: ObjectId | string,
) => {
    try {
        const jobs = await MessageModel.find({
            participants: {
                $elemMatch: {
                    userId: _id
                },
            }
        });
        return jobs;
    } catch (error) {
        next(error);
    };
};

export const getMessageByIdService = async (
    next: NextFunction,
    id: string,
) => {
    try {
        const jobs = await MessageModel.findOne({
            chatId: id
        });
        return jobs;
    } catch (error) {
        next(error);
    };
};

export const postMessageByIdService = async (
    next: NextFunction,
    chatId: string,
    message: postMessageByIdServiceType,
) => {
    try {
        const jobs = await MessageModel.findOneAndUpdate(
            {
                chatId: chatId,
            },
            {
                $push: {  // add data on db push
                    messages: message,
                }
            },
            {
                new: true, //save new message
            }
        );
        return jobs;
    } catch (error) {
        next(error);
    };
};

export const postMessageByIdFirstTimeService = async (
    next: NextFunction,
    chatId: string,
    participants: Participant[],
    message: postMessageByIdServiceType,
) => {
    try {
        const jobs = await new MessageModel({
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
    } catch (error) {
        next(error);
    };
};