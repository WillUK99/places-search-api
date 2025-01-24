import type { Request, Response } from 'express'
import cityService from 'service/city.service';

class CityController {
  async search(req: Request, res: Response) {
    try {
      const query = req.query.id as string;

      if (!query) {
        return res.status(400).json({ error: "Query term is required" })
      }

      const results = await cityService.getById({ query: { id: query } })

      if (!results) {
        return res.status(404).json({ error: "City not found" });
      }

      res.json(results)
    } catch (error: any) {
      console.log("Error whilst fetching city", error)
      res.status(500).json({ error: error.message })
    }
  }
}

export default new CityController()
