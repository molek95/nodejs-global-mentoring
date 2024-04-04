import { products } from "../models/product.entity";

export async function getProducts() {
  return products;
}

export async function getProductById(productId: string) {
  return products.find((product) => product.id === productId);
}
