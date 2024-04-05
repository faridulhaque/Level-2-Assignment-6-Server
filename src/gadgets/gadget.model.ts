import mongoose, { Schema } from "mongoose";
import { TGadget } from "./gadget.interfaces";

const gadgetSchema = new Schema<TGadget>({
    name: { type: String, required: true },
    imgUrl: {type: String, required: true},
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    releaseYear: { type: Number },
    brand: { type: String },
    category: { type: String },
    model: { type: String },
    os: { type: String },
    connectivity: { type: String },
    powerSource: { type: String },
    features: {
      camera: { type: String },
      storage: { type: String },
      screenSize: { type: Number },
    },
    others: {
      weight: { type: Number },
      dimensions: { type: String },
    },
    isDeleted: { type: Boolean, default: false },
    createdBy: {type: Schema.Types.ObjectId, required: true}
  },
  {
    timestamps: true,
  }
  );
  
  const GadgetModel = mongoose.model<TGadget>("Gadget", gadgetSchema);
  
  export default GadgetModel;