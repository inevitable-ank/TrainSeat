const db = require('../db');

// Cancel reservation
const cancelReservation = async (req, res) => {
  try {
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({ error: 'Invalid input' });
    }

    // Fetch user ID
    const user = await db.query('SELECT * FROM Users WHERE username = $1', [username]);
    if (!user.rows[0]) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userId = user.rows[0].id;

    // Cancel reservations
    await db.query('UPDATE Seats SET is_reserved = FALSE, reserved_by = NULL WHERE reserved_by = $1', [
      userId,
    ]);

    res.json({ message: 'Reservation canceled successfully' });
  } catch (error) {
    console.error('Error canceling reservation:', error);
    res.status(500).json({ error: 'Error canceling reservation' });
  }
};

module.exports = { cancelReservation };
