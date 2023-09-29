"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
const colors_1 = __importDefault(require("colors"));
const mongodb_1 = __importDefault(require("./utils/lib/mongodb"));
const index_1 = __importDefault(require("./route/v1/index"));
const errorHandler_1 = require("./middleware/errorHandler");
// initialized the app and port
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
// middleware
const corsOptions = {
    credentials: true,
    origin: [
        "https://sob-jobs.vercel.app",
        "http://localhost:3000",
        "https://vercel.app",
        "https://sob-jobs-server-via-cli.vercel.app",
    ],
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)()); // cookie send receive package is more easi via this
app.use((0, compression_1.default)()); //reduce size for production levele fast working
// mongodb connect 
try {
    (0, mongodb_1.default)();
}
catch (error) {
    console.log("Could not connect to Mongoose: ", error);
}
;
// routes
app.use("/api/v1", (0, index_1.default)());
// home || testing route
app.get("/", (req, res) => {
    res.send({
        success: true,
        message: "Welcome to the sob-jobs server",
        data: " dummy data for home page of the sob-jobs server",
    });
});
// if not found route
app.all("*", (req, res) => {
    res.status(404).send("NO ROUTE FOUND.");
});
// global error handler
app.use(errorHandler_1.errorHandler);
app.listen(port, () => {
    console.log(colors_1.default.bgCyan(`sob-jobs server listening on port: ${port}`));
});
//# sourceMappingURL=server.js.map