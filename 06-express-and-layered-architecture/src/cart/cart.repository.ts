import { CartEntity, CartItemEntity, cart } from "../models/cart.entity";
import { v4 as uuid } from "uuid";
import { products } from "../models/product.entity";

const carts = new Map();
carts.set(cart.userId, cart);

export async function getCart(userId: string): Promise<CartEntity> {
  const cart = carts.get(userId);
  return cart && !cart.isDeleted ? cart : null;
}

export async function createCart(userId: string) {
  let cart: CartEntity = {
    id: uuid(),
    userId,
    isDeleted: false,
    items: [],
  };

  carts.set(userId, cart);
  return cart;
}

export async function updateCart(
  userId: string,
  updateItem: { productId: string; count: number }
) {
  const cart = await getCart(userId);
  if (!cart) {
    throw new Error("Cart not found");
  }

  const currentItem = cart.items.find(
    (item) => item.product.id === updateItem.productId
  );
  if (currentItem) {
    if (updateItem.count > 0) {
      currentItem.count = updateItem.count;
    } else {
      cart.items = cart.items.filter(
        (item) => item.product.id !== currentItem.product.id
      );
    }
  } else {
    if (updateItem.count > 0) {
      const newProduct = products.find(
        (product) => product.id === updateItem.productId
      );
      if (newProduct) {
        const newCartItem: CartItemEntity = {
          product: newProduct,
          count: updateItem.count,
        };
        cart.items.push(newCartItem);
      } else {
        throw new Error("Product not found");
      }
    }
  }
  carts.set(userId, cart);
  return getCart(userId);
}

export async function deleteCart(userId: string) {
  const cart = carts.get(userId);

  if (!cart) {
    throw new Error("Cart not found");
  }

  cart.isDeleted = true;
  carts.set(userId, cart);
}
