import { inject, injectable } from "inversify";
import { IMailer } from "../interfaces/IMailer";
import { IMessageBroker } from "../interfaces/IMessageBroker";
import { IProductInteractor } from "../interfaces/IProductInteractor";
import { IProductRepository } from "../interfaces/IProductRepository";
import { INTERFACE_TYPE } from "../utils";

@injectable()
export class ProductInteractor implements IProductInteractor {
    private repository: IProductRepository;
    private mailer: IMailer;
    private messageBroker: IMessageBroker;

    constructor(
        @inject(INTERFACE_TYPE.ProductRepository) repository: IProductRepository,
        @inject(INTERFACE_TYPE.Mailer) mailer: IMailer,
        @inject(INTERFACE_TYPE.MessageBroker) messageBroker: IMessageBroker
    ) {
        this.repository = repository;
        this.mailer = mailer;
        this.messageBroker = messageBroker;
    }

    async createProduct(input: any) {
        const product = await this.repository.create(input);
        await this.mailer.sendEmail(
            "admin@example.com",
            "New product created",
            `New product: ${product.name}`
        );
        return product;
    }
    async updateStock(id: number, stock: number) {
        const product = await this.repository.update(id, stock);
        await this.messageBroker.publish("stock_update", {
            productId: product.id,
            newStock: product.stock,
        });
        return product;
    }
    async getProducts(limit: number, offset: number) {
        return await this.repository.find(limit, offset);
    }
}
