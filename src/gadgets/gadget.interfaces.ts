import { Types } from "mongoose";


export interface TGadget {
  name: string;
  imgUrl: string;
  price: number;
  quantity: number;
  releaseYear: number;
  brand: string;
  category: string;
  model: string;
  os: string;
  connectivity: string;
  powerSource: string;
  features: TGadgetFeatures;
  others: TOthers;
  isDeleted: boolean;
  createdBy: Types.ObjectId
}

type TGadgetFeatures = {
  camera: string;
  storage: string;
  screenSize: number;
};

type TOthers = {
  weight: number;
  dimensions: string;
};



