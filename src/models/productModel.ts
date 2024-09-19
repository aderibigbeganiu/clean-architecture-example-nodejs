import mongoose, { Schema } from "mongoose";
import { IProduct } from "../interfaces/IProduct";

const ProductSchema = new Schema<IProduct>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true, min: 0 },
});

export const ProductModel =
    mongoose.models.Product ??
    mongoose.model<IProduct>("Product", ProductSchema);
