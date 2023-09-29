"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
//create a schema
const messageSchema = new mongoose_1.default.Schema({
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
                type: mongoose_1.default.Schema.Types.ObjectId,
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
}, {
    timestamps: true, // for time save by default
});
// Create a modal
exports.MessageModel = mongoose_1.default.model("Message", messageSchema);
//# sourceMappingURL=messageSchema.js.map