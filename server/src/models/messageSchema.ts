import { MessageObjectType } from "interfaceServer.ts/interfaceServer.ts";
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema<MessageObjectType>({
    messageId: {
        type: String,
        required: true
    },
    messageName: {
        type: String,
        required: true
    },
    messages: [
        {
            time: {
                type: Date,
                default: new Date(),
            },
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true
            },
            message: {
                type: String,
                required: true
            }
        }
    ]
});

//Create a Mongoose Model for Message
export const MessageSchema = mongoose.model("MesssageSchema", messageSchema);