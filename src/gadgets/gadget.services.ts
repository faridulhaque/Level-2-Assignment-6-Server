import { startSession } from "mongoose";
import { TGadget } from "./gadget.interfaces";
import GadgetModel from "./gadget.model";
import AppError from "../errorHandlers/appError";

export const createGadgetService = async (data: TGadget) => {
  return await GadgetModel.create(data);
};

export const updateGadgetService = async (
  id: string,
  data: Partial<TGadget>
) => {
  const { features, others, ...primData } = data;

  const session = await startSession();

  try {
    await session.withTransaction(async () => {
      await GadgetModel.findByIdAndUpdate(id, primData, { session });

      if (features) {
        const featuresUpdate = {
          $set: {
            "features.camera": features.camera,
            "features.screenSize": features.screenSize,
            "features.storage": features.storage,
          },
        };

        await GadgetModel.findByIdAndUpdate(id, featuresUpdate, {
          session,
          upsert: true,
        });
      }

      if (others) {
        const othersUpdate = {
          $set: {
            "others.dimensions": others.dimensions,
            "others.weight": others.weight,
          },
        };

        await GadgetModel.findByIdAndUpdate(id, othersUpdate, {
          session,
          upsert: true,
        });
      }
    });
  } catch (error) {
    await session.abortTransaction();
    throw new AppError("MONGO", error);
  } finally {
    await session.endSession();
  }

  return null;
};

export const deleteGadgetService = async (id: string) => {
  return await GadgetModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
};

export const deleteMultipleGadgetService = async (ids: string[]) => {
  return await GadgetModel.updateMany(
    { _id: { $in: ids } },
    { isDeleted: true }
  );
};

export const getGadgetByFilterService = async (data: any) => {
  const {
    // maxPrice,
    // minPrice,
    name,
    releaseYear,
    brand,
    model,
    category,
    os,
    connectivity,
    powerSource,
    camera,
    screenSize,
    storage,
    weight,
    dimensions,
  } = data;

  const query: any = {};
  // if (maxPrice && minPrice) {
  //   query.price = { $gte: Number(minPrice), $lte: Number(maxPrice) };
  // } else if (maxPrice) {
  //   query.price = { $lte: Number(maxPrice) };
  // } else if (minPrice) {
  //   query.price = { $gte: Number(minPrice) };
  // }

  if (name) {
    query.name = name;
  }

  if (releaseYear) {
    query.releaseYear = releaseYear;
  }
  if (brand) {
    query.brand = brand;
  }
  if (model) {
    query.model = model;
  }
  if (category) {
    query.category = category;
  }
  if (os) {
    query.os = os;
  }
  if (connectivity) {
    query.connectivity = connectivity;
  }
  if (powerSource) {
    query.powerSource = powerSource;
  }
  if (camera) {
    query.camera = camera;
  }

  if (screenSize) {
    query.screenSize = screenSize;
  }
  if (storage) {
    query.storage = storage;
  }
  if (weight) {
    query.weight = weight;
  }
  if (dimensions) {
    query.dimensions = dimensions;
  }

  if (Object.keys(query).length > 0) {
    return await GadgetModel.find(query, { isDeleted: false });
  } else {
    return null;
  }
};

export const getAllGadgetsService = async () => {
  return await GadgetModel.find({ isDeleted: false });
};

export const getOneGadgetsService = async (id: string) => {
  return await GadgetModel.findById(id, { isDeleted: false });
};

export const getGadgetFilteredValues = async () => {
  return await GadgetModel.aggregate([
    {
      $match: {
        isDeleted: false,
      },
    },
    {
      $group: {
        _id: null,
        name: { $addToSet: { $cond: [{ $ne: ["$name", ""] }, "$name", null] } },
        model: {
          $addToSet: { $cond: [{ $ne: ["$model", ""] }, "$model", null] },
        },
        releaseYear: {
          $addToSet: {
            $cond: [{ $ne: ["$releaseYear", 0 || ""] }, "$releaseYear", null],
          },
        },
        brand: {
          $addToSet: { $cond: [{ $ne: ["$brand", ""] }, "$brand", null] },
        },
        category: {
          $addToSet: { $cond: [{ $ne: ["$category", ""] }, "$category", null] },
        },
        os: { $addToSet: { $cond: [{ $ne: ["$os", ""] }, "$os", null] } },
        connectivity: {
          $addToSet: {
            $cond: [{ $ne: ["$connectivity", ""] }, "$connectivity", null],
          },
        },
        powerSource: {
          $addToSet: {
            $cond: [{ $ne: ["$powerSource", ""] }, "$powerSource", null],
          },
        },
        camera: {
          $addToSet: {
            $cond: [
              { $ne: ["$features.camera", ""] },
              "$features.camera",
              null,
            ],
          },
        },
        storage: {
          $addToSet: {
            $cond: [
              { $ne: ["$features.storage", ""] },
              "$features.storage",
              null,
            ],
          },
        },
        screenSize: {
          $addToSet: {
            $cond: [
              { $ne: ["$features.screenSize", 0 || ""] },
              "$features.screenSize",
              null,
            ],
          },
        },
        weight: {
          $addToSet: {
            $cond: [
              { $ne: ["$others.weight", 0 || ""] },
              "$others.weight",
              null,
            ],
          },
        },
        dimensions: {
          $addToSet: {
            $cond: [
              { $ne: ["$others.dimensions", ""] },
              "$others.dimensions",
              null,
            ],
          },
        },
      },
    },
  ]);
};
