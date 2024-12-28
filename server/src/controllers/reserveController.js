import { db } from "../db/index.js";
import { users, seats } from "../db/schema.js";

export const reserveSeats = async (req, res) => {
  const { username, seatCount } = req.body;

  if (!username || !seatCount) {
    return res.status(400).json({ error: "Invalid input" });
  }

  try {
    // Find or create user
    let user = await db.select().from(users).where(users.username.eq(username)).limit(1);
    if (user.length === 0) {
      [user] = await db.insert(users).values({ username }).returning();
    }

    // Fetch available seats
    const availableSeats = await db
      .select()
      .from(seats)
      .where(seats.is_reserved.eq(false))
      .limit(seatCount);

    if (availableSeats.length < seatCount) {
      return res.status(400).json({ error: "Not enough seats available" });
    }

    // Reserve seats
    await db
      .update(seats)
      .set({ is_reserved: true, reserved_by: user.id })
      .where(seats.id.in(availableSeats.map((seat) => seat.id)));

    res.json({ message: "Seats reserved successfully" });
  } catch (error) {
    console.error("Error reserving seats:", error);
    res.status(500).json({ error: "Error reserving seats" });
  }
};
