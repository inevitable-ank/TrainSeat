const db = require('../db');

// Fetch all seats
const getSeats = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM Seats ORDER BY row_number, seat_number');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching seats:', error);
    res.status(500).json({ error: 'Error fetching seats' });
  }
};

module.exports = { getSeats };
