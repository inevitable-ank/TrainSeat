import express from "express";
import { reserveSeats } from "../controllers/reserveController.js";

const router = express.Router();

router.post("/", reserveSeats);

export default router;
