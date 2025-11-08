import { Router } from "express";
import authRouter from "../routes/authRoutes.js"
import taskRouter from "../routes/taskRoutes.js"
import profileRouter from "../routes/userProfileRouters.js"

const routers = Router();

routers.use("/", authRouter);
routers.use("/task", taskRouter);
routers.use("/profile", profileRouter);

export default routers;