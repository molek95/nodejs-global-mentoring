import express from "express";
import * as productService from "./product.service";

const router = express.Router();

router.get("/api/products", async (req, res) => {
  try {
    const products = await productService.getProducts();
    res.json(products);
  } catch (err) {
    res.status(500).send((err as Error).message);
  }
});

router.get("/api/products/:productId", async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.productId);

    if (product) {
      res.json(product);
    } else {
      res.status(404).send("Product not found");
    }
  } catch (err) {
    res.status(500).send((err as Error).message);
  }
});

export default router;
