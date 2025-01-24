import { Request, Response } from 'express'
import searchService from 'service/search.service'

class SearchController {
  async search(req: Request, res: Response) {
    try {
      const query = req.query.q as string;

      if (!query) {
        return res.status(400).json({ error: "Query term is required" })
      }

      const results = await searchService.search({ query: { q: query } })

      res.json(results)
    } catch (error: any) {
      console.log("Error whilst fetching places", error)
      res.status(500).json({ error: "Search failed" })
    }
  }
}

export default new SearchController()
