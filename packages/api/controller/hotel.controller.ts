import type { Request, Response } from 'express'
import hotelService from 'service/hotel.service';

class HotelController {
  async search(req: Request, res: Response) {
    try {
      const query = req.query.id as string;

      if (!query) {
        return res.status(400).json({ error: "Query term is required" })
      }

      const results = await hotelService.getById({ query: { id: query } })

      if (!results) {
        return res.status(404).json({ error: "Hotel not found" });
      }

      res.json(results)
    } catch (error: any) {
      console.log("Error whilst fetching Hotel", error)
      res.status(500).json({ error: error.message })
    }
  }
}

export default new HotelController()
