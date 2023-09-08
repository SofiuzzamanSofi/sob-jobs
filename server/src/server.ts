import express from 'express'
import dotenv from 'dotenv'
dotenv.config();
import cors from 'cors';
import colors from 'colors';
import conncetDb from './utils/lib/mongodb';
import routers from './routes/index';
import { errorHandler } from './middleware/errorHandler';


// initialized the app and port
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors({
    credentials: true,
}));
app.use(express.json());

// mongodb connect 
try {
    conncetDb();
} catch (error) {
    console.log("Could not connect to Mongoose: ", error);
};

// routes
app.use("/routes", routers());

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