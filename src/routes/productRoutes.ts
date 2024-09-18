import { Router } from "express";
import { ProductController } from "../controllers/productController";
import { ProductInteractor } from "../interactors/productInteractor";
import { ProductRepository } from "../repositories/productRepository";
import { Mailer } from "../external-libraries/mailer";
import { MessageBroker } from "../external-libraries/messageBroker";

const mailer = new Mailer();
const messageBroker = new MessageBroker();
const repository = new ProductRepository();
const interactor = new ProductInteractor(repository, mailer, messageBroker);
const controller = new ProductController(interactor);

const router = Router();

router.post("/products", controller.onCreateProduct.bind(controller));
router.get("/products", controller.onGetProducts.bind(controller));
router.patch("/products/:id", controller.onUpdateStock.bind(controller));

export default router;
