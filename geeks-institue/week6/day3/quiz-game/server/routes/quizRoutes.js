import express from "express";
import { getQuestions } from "../controllers/quizController.js";

const router = express.Router();

router.get("/", getQuestions);

export default router;
