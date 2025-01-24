import CitiesModel from "model/cities.model";
import CountriesModel from "model/countries.model";
import HotelsModel from "model/hotels.model";
import { GetSearchInput } from "schema/search.schema";

class SearchService {
  async search(input: GetSearchInput) {
    const { q } = input.query

    try {
      const regex = new RegExp(`^${q}`, "i");

      const [countries, cities, hotels] = await Promise.all([
        CountriesModel.find({ country: { $regex: regex } }).limit(10),
        CitiesModel.find({ name: { $regex: regex } }).limit(10),
        HotelsModel.find({ hotel_name: { $regex: regex } }).limit(10),
      ]);

      return { countries, cities, hotels }
    } catch (error) {
      console.error("Error searching places:", error);
      throw new Error("Failed to fetch places");
    }
  }
}

export default new SearchService()
