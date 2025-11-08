import { Router } from "express";
import { verifyJWT } from "../middleware/authMiddleware.js";
import {
    createTask,
    updateTask,
    deleteTask,
    getAllTask
} from "../controllers/taskController.js";

const router = Router();

router.route("/")
    .get(verifyJWT, getAllTask)
    .post(verifyJWT, createTask)

router.route("/:id")
    .put(verifyJWT, updateTask)
    .delete(verifyJWT, deleteTask)

export default router;
