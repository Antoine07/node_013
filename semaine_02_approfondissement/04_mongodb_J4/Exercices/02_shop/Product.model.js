import mongoose from "mongoose";

const { Schema, model } = mongoose;

const ProductSchema = new Schema(
  {
    sale: Boolean,
    price: {
      type: mongoose.Types.Decimal128,
      get: getPrice,
    },
    society: String,
    qty: Number,
    size: { h: Number, w: Number, uom: String },
    year: Date,
  },
  { toJSON: { getters: true } }
);

const modelName = "products";
const collectionName = "products";

export const ProductModel = model(modelName, ProductSchema, collectionName);

function getPrice(value) {
//   console.log(value);
  if (typeof value !== "undefined") {
    return parseFloat(value.toString());
  }
  return value;
}
