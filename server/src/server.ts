import dotenv from 'dotenv'
dotenv.config();
import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors';
import compression from 'compression';
import colors from 'colors';
import conncetDb from './utils/lib/mongodb';
import routers from './route/v1/index';
import { errorHandler } from './middleware/errorHandler';

// initialized the app and port
const app = express();
const port = process.env.PORT || 5000;

// middleware
// const corsOptions = {
//     credentials: true,
//     origin: [
//         "https://sob-jobs.vercel.app",
//         "http://localhost:3000",
//         "https://vercel.app",
//         "https://sob-jobs-server-via-cli.vercel.app",
//     ],
// };
// app.use(cors(corsOptions));
app.use(cors({ credentials: true }))

app.use(express.json());
app.use(cookieParser())   // cookie send receive package is more easi via this
app.use(compression());  //reduce size for production levele fast working

// mongodb connect 
try {
    conncetDb();
} catch (error) {
    console.log("Could not connect to Mongoose: ", error);
};

// routes
app.use("/api/v1", routers());

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
app.use(errorHandler);

app.listen(port, () => {
    console.log(colors.bgCyan(`sob-jobs server listening on port: ${port}`))
});