import mongoose from "mongoose";

const { Schema, model } = mongoose;

const ProductSchema = new Schema({
    sale: Boolean,
    price: mongoose.Types.Decimal128,
    society: String,
    qty: Number,
    size: { h: Number, w: Number, uom: String },
    year: Date,
});

const modelName = "products";
const collectionName = "products";

export const ProductModel = model(modelName, ProductSchema, collectionName);
