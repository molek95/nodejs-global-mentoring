import { v4 as uuid } from "uuid";
import { OrderEntity } from "../../models/order.entity";
import { CartItemEntity } from "../../models/cart.entity";

const orders: Map<string, OrderEntity> = new Map();

export async function createOrder(
  userId: string,
  cart: any,
  payment: any,
  delivery: any,
  comments: any
) {
  const total = cart.items.reduce(
    (p: number, c: CartItemEntity) => p + c.product.price * c.count,
    0
  );

  const order: OrderEntity = {
    id: uuid(),
    userId,
    cartId: cart.id,
    items: JSON.parse(JSON.stringify(cart.items)),
    payment,
    delivery,
    comments,
    status: "created",
    total,
  };

  orders.set(order.id, order);

  return order;
}
