import express from "express";
import producRouter from "./routes/productRoutes";

const PORT = process.env.PORT || 9000;

const app = express();
app.use(express.json());

app.use(producRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
