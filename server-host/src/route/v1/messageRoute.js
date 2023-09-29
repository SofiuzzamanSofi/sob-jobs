"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const verifyToken_1 = __importDefault(require("../../middleware/verifyToken"));
const messageController_1 = require("../../controller/messageController");
exports.default = (router) => {
    // Middleware that applies to all routes below this point
    router.use(verifyToken_1.default);
    router.get('/message/:id', messageController_1.getAllMessageByIdController); // get all message by messageId 
    router.get('/message/details/:id', messageController_1.getMessageByIdController); // get 1 message by message id
    router.post('/message/post-message', messageController_1.postMessageByIdController); // post 1 message by message id
};
//# sourceMappingURL=messageRoute.js.map