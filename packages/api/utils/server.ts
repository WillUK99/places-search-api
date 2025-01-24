import cors from 'cors';
import express from "express"
import { routes } from "../routes"

export const createServer = () => {
  const app = express()

  app.use(cors())
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))

  routes(app)

  app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error("Unhandled error:", err);

    res.status(err.status || 500).json({
      error: err.message || "Internal Server Error",
    });
  });

  return app
}