import dotenv from "dotenv"
import { app } from "./app.js";
import connectDB from "./Database/db.js";

dotenv.config({
    path: './.env'
});

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 4000, () => {
            console.log(`app is running at port: ${process.env.PORT}`);
        });
    }).catch((err) => {
        console.log("MongoDB connection is failed !!!", err);
    })