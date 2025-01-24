import mongoose from 'mongoose';

export type CountriesDocument = mongoose.Document & {
  country: string;
  countryisocode: string;
}

const countriesSchema = new mongoose.Schema(
  {
    country: { type: String, required: true },
    countryisocode: { type: String, required: true },
  },
  {
    timestamps: true,
    collection: 'countries'
  }
)
countriesSchema.index({ country: 1 })

const CountriesModel = mongoose.model<CountriesDocument>('Countries', countriesSchema)

export default CountriesModel
