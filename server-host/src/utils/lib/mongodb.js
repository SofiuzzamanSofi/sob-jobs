"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const colors_1 = __importDefault(require("colors"));
const { MONGODB_DB_URI } = process.env;
if (!MONGODB_DB_URI) {
    throw new Error("MONGODB_DB_URI is required");
}
;
const conncetDb = async () => {
    try {
        const { connection } = await mongoose_1.default.connect(MONGODB_DB_URI);
        if (connection?.readyState === 1) {
            console.log(colors_1.default.bgBlue("DB connection is established/ON."));
            return Promise?.resolve(true);
        }
        ;
    }
    catch (error) {
        Promise?.resolve(error);
        //  console.log("MONGODB CONNECTED CATCH-ERROR:", error);
    }
    ;
};
exports.default = conncetDb;
//# sourceMappingURL=mongodb.js.map