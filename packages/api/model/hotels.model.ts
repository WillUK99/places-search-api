import mongoose from 'mongoose';

export type HotelsDocument = mongoose.Document & {
  chain_name: string;
  hotel_name: string;
  addressline1: string;
  addressline2: string;
  zipcode: string;
  city: string;
  state: string;
  country: string;
  countryisocode: string;
  star_rating: number;
}

const hotelsSchema = new mongoose.Schema({
  chain_name: { type: String, required: true },
  hotel_name: { type: String, required: true },
  addressline1: { type: String, required: true },
  addressline2: { type: String },
  zipcode: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  countryisocode: { type: String, required: true },
  star_rating: { type: Number, required: true },
}, {
  timestamps: true,
  collection: 'hotels'
})
hotelsSchema.index({ hotel_name: 1 })

const HotelsModel = mongoose.model<HotelsDocument>('Hotels', hotelsSchema)

export default HotelsModel
