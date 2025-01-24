import * as z from "zod"

const params = {
  query: z.object({
    id: z.string({ required_error: 'City ID is required' }),
  }),
}

export const getCitySchema = z.object({
  ...params
})

export type GetCityInput = z.infer<typeof getCitySchema>