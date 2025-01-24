import * as z from "zod"

const params = {
  query: z.object({
    id: z.string({ required_error: 'Country ID is required' }),
  })
}

export const getCountySchema = z.object({
  ...params
})

export type GetCountyInput = z.infer<typeof getCountySchema>
