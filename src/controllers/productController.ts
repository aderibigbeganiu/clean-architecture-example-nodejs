import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import { IProductInteractor } from "../interfaces/IProductInteractor";
import { INTERFACE_TYPE } from "../utils";

@injectable()
export class ProductController {
    private interactor: IProductInteractor;

    constructor(
        @inject(INTERFACE_TYPE.ProductInteractor) interactor: IProductInteractor
    ) {
        this.interactor = interactor;
    }

    async onCreateProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const body = req.body;

            const data = await this.interactor.createProduct(body);

            res.status(201).json(data);
        } catch (error) {
            next(error);
        }
    }
    async onGetProducts(req: Request, res: Response, next: NextFunction) {
        try {
            const limit = parseInt(`${req.query.limit}`) || 10;
            const offset = parseInt(`${req.query.offset}`) || 0;
            const data = await this.interactor.getProducts(limit, offset);

            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }
    async onUpdateStock(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id);
            const stock = parseInt(req.body.stock);

            const data = await this.interactor.updateStock(id, stock);

            res.status(204).json(data);
        } catch (error) {
            next(error);
        }
    }
}
