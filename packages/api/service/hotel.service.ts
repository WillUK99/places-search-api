import HotelModel from "model/hotels.model";
import mongoose from "mongoose";

import { GetHotelInput } from "schema/hotels.schema";

class HotelService {
  async getById(input: GetHotelInput) {
    const { id } = input.query;

    try {
      if (!id) {
        throw new Error("Hotel ID is required");
      }

      if (!mongoose.isValidObjectId(id)) {
        throw new Error("Invalid Hotel ID");
      }

      const hotel = await HotelModel.findById(id);

      if (!hotel) {
        throw new Error("Hotel not found");
      }

      return hotel;
    } catch (error: any) {
      console.error("Error searching hotels:", error);
      throw new Error(error.message || "Error searching hotels");
    }
  }
}

export default new HotelService()
