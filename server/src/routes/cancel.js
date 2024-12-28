import express from "express";
import { cancelReservation } from "../controllers/cancelController.js";

const router = express.Router();

router.post("/", cancelReservation);

export default router;
