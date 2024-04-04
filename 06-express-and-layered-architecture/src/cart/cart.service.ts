import {
  createCart,
  getCart,
  updateCart as updateCartRepository,
  deleteCart as deleteCartRepository,
} from "./cart.repository";

export async function getOrCreateCart(userId: string) {
  let cart = await getCart(userId);

  if (!cart) {
    cart = await createCart(userId);
  }

  return cart;
}

export async function updateCart(
  userId: string,
  updateItem: { productId: string; count: number }
) {
  return updateCartRepository(userId, updateItem);
}

export async function deleteCart(userId: string): Promise<void> {
  return deleteCartRepository(userId);
}
