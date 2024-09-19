import "reflect-metadata";
import express from "express";
import producRouter from "./routes/productRoutes";
import mongoose from "mongoose";

const PORT = process.env.PORT || 9000;

const app = express();
app.use(express.json());

app.use(producRouter);

mongoose
    .connect(process.env.DATABASE_URI!)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
