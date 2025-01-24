import type { NextFunction, Request, Response } from 'express'
import countryService from 'service/country.service'

class CountryController {
  async search(req: Request, res: Response) {
    try {
      const query = req.query.id as string;

      if (!query) {
        return res.status(400).json({ error: "Query term is required" })
      }

      const results = await countryService.getById({ query: { id: query } })

      if (!results) {
        return res.status(404).json({ error: "Country not found" });
      }

      res.json(results)
    } catch (error: any) {
      console.log("Error whilst fetching country", error)
      res.status(500).json({ error: error.message })
    }
  }
}

export default new CountryController()
