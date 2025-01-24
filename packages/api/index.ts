import { connectDB } from "db/connect";
import dotenv from "dotenv";
import { createServer } from "utils/server";

dotenv.config();

if (process.env.NODE_ENV !== 'production' && !process.env.DATABASE_URL) {
  await import('./db/startAndSeedMemoryDB');
}

const PORT = process.env.PORT || 3001;

const app = createServer()

app.listen(PORT, async () => {
  console.log(`API Server Started at ${PORT}`)
  await connectDB()
})
