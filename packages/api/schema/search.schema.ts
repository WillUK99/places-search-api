import * as z from "zod"

const params = {
  query: z.object({
    q: z.string({ required_error: 'Query term is required' }),
  }),
}

export const getSearchSchema = z.object({
  ...params
})

export type GetSearchInput = z.infer<typeof getSearchSchema>
