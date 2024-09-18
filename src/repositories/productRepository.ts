import { Product } from "../entities/Product";
import { IProductRepository } from "../interfaces/IProductRepository";

export class ProductRepository implements IProductRepository {
    private products: Product[] = [];

    constructor() {
        this.products = [];
    }
    create(data: Product): Promise<Product> {
        const product = new Product(
            data.name,
            data.description,
            data.price,
            data.stock,
            this.products.length + 1
        );
        this.products.push(product);
        return Promise.resolve(product);
    }
    update(id: number, stock: number): Promise<Product> {
        const product = this.products.find((p) => p.id === id);
        if (!product) {
            throw new Error(`Product with id ${id} not found.`);
        }
        product.stock = stock;
        return Promise.resolve(product);
    }
    find(limit: number, offset: number): Promise<Product[]> {
        const startIndex = offset;
        const endIndex = Math.min(startIndex + limit, this.products.length);
        return Promise.resolve(this.products.slice(startIndex, endIndex));
    }
}
