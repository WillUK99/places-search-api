import mongoose from "mongoose";

export type CitiesDocument = mongoose.Document & {
  name: string
};

const citiesSchema = new mongoose.Schema({
  name: { type: String, required: true }
}, {
  timestamps: true,
  collection: 'cities'
})
citiesSchema.index({ name: 1 })

const CitiesModel = mongoose.model<CitiesDocument>('Cities', citiesSchema)

export default CitiesModel
