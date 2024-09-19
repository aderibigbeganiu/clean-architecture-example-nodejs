import { inject, injectable } from "inversify";
import { Product } from "../entities/Product";
import { IProductRepository } from "../interfaces/IProductRepository";
import mongoose, { Model } from "mongoose";
import { INTERFACE_TYPE } from "../utils";

@injectable()
export class ProductRepository implements IProductRepository {
    private client: Model<Product>;

    constructor(
        @inject(INTERFACE_TYPE.ProductModel) client: mongoose.Model<Product>
    ) {
        this.client = client;
    }
    async create(data: Product): Promise<Product> {
        const product = new this.client({
            name: data.name,
            description: data.description,
            price: data.price,
            stock: data.stock,
        });
        product.save();
        return Promise.resolve(product);
    }
    async update(id: string, stock: number): Promise<Product> {
        const product = await this.client.findOneAndUpdate(
            { _id: id },
            { stock },
            { new: true }
        );
        if (!product) {
            throw new Error(`Product with id ${id} not found.`);
        }
        return Promise.resolve(product);
    }
    async find(limit: number, offset: number): Promise<Product[]> {
        const products = await this.client.find().skip(offset).limit(limit);
        return products;
    }

    async findById(id: string): Promise<Product> {
        const product = await this.client.findById(id);
        if (!product) {
            throw new Error(`Product with id ${id} not found.`);
        }
        return product;
    }
}
