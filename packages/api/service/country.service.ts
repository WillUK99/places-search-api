import CountriesModel from "model/countries.model";
import mongoose from "mongoose";

import { GetCountyInput } from "schema/countries.schema";

class CountryService {
  async getById(input: GetCountyInput) {
    const { id } = input.query;

    try {
      if (!id) {
        throw new Error("Country ID is required");
      }

      if (!mongoose.isValidObjectId(id)) {
        throw new Error("Invalid country ID");
      }

      const country = await CountriesModel.findById(id);

      if (!country) {
        throw new Error("Country not found");
      }

      return country;
    } catch (error: any) {
      console.error("Error searching countries:", error);
      throw new Error(error.message || "Error searching countries");
    }
  }
}

export default new CountryService()
