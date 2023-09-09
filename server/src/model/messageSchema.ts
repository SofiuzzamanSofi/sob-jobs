import { MessageObjectType } from "../interfaceServer/interfaceServer.ts.js";
import mongoose from "mongoose";

//create a schema
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
},
    {
        timestamps: true, // for time save by default
    }
);

// Create a modal
export const MessageModel = mongoose.model("Message", messageSchema);