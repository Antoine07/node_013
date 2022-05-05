import mongoose from "mongoose";

const { Schema, model } = mongoose;

const CategoriesSchema = new Schema({
    categoryName: String
});

export const CategoryModel = model("category", CategoriesSchema, "categories");

const ArticlesSchema = new Schema({
    productName: String,
    category: { type: mongoose.Types.ObjectId, ref: "category" }
});

export const ArticleModel = model("article", ArticlesSchema, "articles");
