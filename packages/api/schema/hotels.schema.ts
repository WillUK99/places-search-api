import { query } from "express"
import * as z from "zod"

const params = {
  query: z.object({
    id: z.string({ required_error: 'Hotel ID is required' }),
  }),
}

export const getHotelSchema = z.object({
  ...params
})

export type GetHotelInput = z.infer<typeof getHotelSchema>