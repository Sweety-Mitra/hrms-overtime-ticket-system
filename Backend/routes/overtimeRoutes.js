import express from "express";
import { createOvertime } from "../controllers/overtimeController.js";

const router = express.Router();

router.post("/", createOvertime);

export default router;