import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import seatsRoutes from "./routes/seats.js";
import reserveRoutes from "./routes/reserve.js";
import cancelRoutes from "./routes/cancel.js";

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/seats", seatsRoutes);
app.use("/reserve", reserveRoutes);
app.use("/cancel", cancelRoutes);

export default app;
