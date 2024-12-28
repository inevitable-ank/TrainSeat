import { db } from "../db/index.js";
import { seats } from "../db/schema.js";

export const getSeats = async (req, res) => {
  try {
    const allSeats = await db
      .select()
      .from(seats)
      .orderBy(seats.row_number, seats.seat_number);
    res.json(allSeats);
  } catch (error) {
    console.error("Error fetching seats:", error);
    res.status(500).json({ error: "Error fetching seats" });
  }
};
