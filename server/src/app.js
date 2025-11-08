import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import userRouters from "./routes/index.js"

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true
}));

app.use(express.json({limit: "2kb"}));

app.use(express.urlencoded({extended:true, limit: "2kb"}));
app.use(express.static("public"));
app.use(cookieParser());

// all router access
app.use("/api/v1/user", userRouters);

export {app}