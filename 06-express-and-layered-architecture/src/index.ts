import express from "express";
import cartController from "./cart/cart.controller";
import productController from "./product/product.controller";

const app = express();
const port = 8000;

app.use(express.json());
app.use(cartController);
app.use(productController);

app.listen(port, () => {
  console.log("Server is running");
});
