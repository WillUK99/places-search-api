import CitiesModel from "model/cities.model";
import mongoose from "mongoose";
import { GetCityInput } from "schema/citites.schema";

class CityService {
  async getById(input: GetCityInput) {
    const { id } = input.query;

    try {
      if (!id) {
        throw new Error("City ID is required");
      }

      if (!mongoose.isValidObjectId(id)) {
        throw new Error("Invalid City ID");
      }

      const city = await CitiesModel.findById(id);

      if (!city) {
        throw new Error("City not found");
      }

      return city;
    } catch (error: any) {
      console.error("Error searching cities:", error);
      throw new Error(error.message || "Error searching cities");
    }
  }
}

export default new CityService()
