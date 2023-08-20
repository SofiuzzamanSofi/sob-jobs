import { MessageObjectType } from "interfaceServer.ts/interfaceServer.ts";
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema<MessageObjectType>({
    chatId: {
        type: "string",
        required: true
    },
    participants: [
        {
            userId: "string",
            userName: "string",
            userEmail: "string",
        }
    ],
    messages: [
        {
            messageId: {
                type: "string",
                required: true
            },
            timestamp: {
                type: Date,
                default: new Date(),
            },
            senderId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true
            },
            senderEmail: {
                type: "string",
                required: true,
            },
            content: {
                type: "string",
                required: true
            }
        }
    ]
});

//Create a Mongoose Model for Message
export const MessageSchema = mongoose.model("MesssageSchema", messageSchema);