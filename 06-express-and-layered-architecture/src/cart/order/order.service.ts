import { createOrder as createOrderRepository } from "./order.repository";
import { deleteCart as deleteCartRepository } from "../cart.repository";
import { getCart as getCartRepository } from "../cart.repository";

export async function createOrder(
  userId: string,
  payment: any,
  delivery: any,
  comments: any
) {
  const cart = await getCartRepository(userId);

  if (!cart || cart.items.length === 0) {
    throw new Error("Cart is empty");
  }

  const order = await createOrderRepository(
    userId,
    cart,
    payment,
    delivery,
    comments
  );
  await deleteCartRepository(userId);
  return order;
}
