import app from "./app";
import { connectDB } from "./db/connection";

const PORT = 3001;

async function startServer() {
  try {
    await connectDB(); // 🔗 חיבור ל־MongoDB

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });

  } catch (err) {
    console.error("❌ Failed to start server:", err);
  }
}

startServer();