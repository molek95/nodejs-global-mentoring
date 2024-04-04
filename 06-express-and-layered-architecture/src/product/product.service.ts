import { getProducts as getProductsRepository } from "./product.repository";
import { getProductById as getProductByIdRepository } from "./product.repository";

export async function getProducts() {
  return getProductsRepository();
}

export async function getProductById(productId: string) {
  return getProductByIdRepository(productId);
}
