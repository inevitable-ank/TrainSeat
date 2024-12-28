import app from "./app.js"; // Import the Express app
import "dotenv/config"; // Load environment variables

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
