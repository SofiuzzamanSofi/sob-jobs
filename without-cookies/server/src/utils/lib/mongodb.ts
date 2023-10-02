import mongoose from "mongoose";
import colors from 'colors';

const { MONGODB_DB_URI } = process.env;
if (!MONGODB_DB_URI) {
    throw new Error("MONGODB_DB_URI is required");
};
const conncetDb = async () => {
    try {
        const { connection } = await mongoose.connect(MONGODB_DB_URI);
        if (connection?.readyState === 1) {
            console.log(colors.bgBlue("DB connection is established/ON."))
            return Promise?.resolve(true);
        };
    } catch (error) {
        Promise?.resolve(error);
        //  console.log("MONGODB CONNECTED CATCH-ERROR:", error);
    };
};

export default conncetDb;