import { db } from "../db/index.js";
import { users, seats } from "../db/schema.js";

export const cancelReservation = async (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: "Invalid input" });
  }

  try {
    // Find user
    const user = await db.select().from(users).where(users.username.eq(username)).limit(1);
    if (user.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    // Cancel reservations
    await db
      .update(seats)
      .set({ is_reserved: false, reserved_by: null })
      .where(seats.reserved_by.eq(user.id));

    res.json({ message: "Reservation canceled successfully" });
  } catch (error) {
    console.error("Error canceling reservation:", error);
    res.status(500).json({ error: "Error canceling reservation" });
  }
};
