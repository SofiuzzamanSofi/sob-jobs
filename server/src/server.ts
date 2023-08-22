import express from 'express'
import dotenv from 'dotenv'
dotenv.config();
import cors from 'cors';
import colors from 'colors';
import conncetDb from './lib/mongodb';
import routers from './routes/index';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
    credentials: true,
}));
app.use(express.json());

// mongoose connect 
try {
    conncetDb();
} catch (error) {
    console.log("Could not connect to Mongoose: ", error);
};

app.use("/routes", routers());

app.get("/", (req, res) => {
    res.send({
        success: true,
        message: "Welcome to the sob-jobs server",
        data: " dummy data for home page of the sob-jobs server",
    });
});

app.listen(port, () => (
    console.log(colors.bgCyan(`sob-jobs server listening on ${port}`))
)
);