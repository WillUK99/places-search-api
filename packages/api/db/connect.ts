import mongoose from "mongoose"

export const connectDB = async (): Promise<void> => {
  const dbUri = process.env.DATABASE_URL as string

  try {
    await mongoose.connect(dbUri, {})

    console.log("Connected to MongoDB")
  } catch (err) {
    if (err instanceof Error) {
      console.error(`Error: ${err.message}`)
      process.exit(1)
    }
  }

  return
}

