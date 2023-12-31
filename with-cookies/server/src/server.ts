import dotenv from 'dotenv'
dotenv.config();
import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors';
import colors from 'colors';
import conncetDb from './utils/lib/mongodb';
import routers from './route/v1/index';
import { errorHandler } from './middleware/errorHandler';

// initialized the app and port
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://sob-job.vercel.app');
    // Add other CORS headers as needed
    next();
});
const corsOptions = {
    credentials: true,
    origin: [
        process.env.CLIENT_SITE_URL_LOCAL,
        process.env.CLIENT_SITE_URL_ONLINE
    ],
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser())   // cookie send receive package is more easi via this

//


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
        data: " Dummy data for home page of the sob-jobs server With-Cookies",
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