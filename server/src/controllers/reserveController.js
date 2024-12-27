const db = require('../db');

// Reserve seats
const reserveSeats = async (req, res) => {
  try {
    const { username, seatCount } = req.body;

    if (!username || !seatCount) {
      return res.status(400).json({ error: 'Invalid input' });
    }

    // Check if user exists, create if not
    const user = await db.query('SELECT * FROM Users WHERE username = $1', [username]);
    let userId = user.rows[0]?.id;
    if (!userId) {
      const newUser = await db.query(
        'INSERT INTO Users (username) VALUES ($1) RETURNING id',
        [username]
      );
      userId = newUser.rows[0].id;
    }

    // Fetch available seats
    const availableSeats = await db.query(
      'SELECT * FROM Seats WHERE is_reserved = FALSE LIMIT $1',
      [seatCount]
    );

    if (availableSeats.rows.length < seatCount) {
      return res.status(400).json({ error: 'Not enough seats available' });
    }

    // Reserve seats
    const reservedSeats = availableSeats.rows.map((seat) => seat.id);
    await db.query(
      'UPDATE Seats SET is_reserved = TRUE, reserved_by = $1 WHERE id = ANY($2)',
      [userId, reservedSeats]
    );

    res.json({ message: 'Seats reserved successfully' });
  } catch (error) {
    console.error('Error reserving seats:', error);
    res.status(500).json({ error: 'Error reserving seats' });
  }
};

module.exports = { reserveSeats };
