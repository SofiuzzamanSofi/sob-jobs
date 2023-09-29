"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoute_1 = __importDefault(require("./userRoute"));
const jobRoute_1 = __importDefault(require("./jobRoute"));
const messageRoute_1 = __importDefault(require("./messageRoute"));
const router = express_1.default.Router();
exports.default = () => {
    (0, userRoute_1.default)(router);
    (0, jobRoute_1.default)(router);
    (0, messageRoute_1.default)(router);
    // console.log('router:', router);
    return router;
};
//# sourceMappingURL=index.js.map