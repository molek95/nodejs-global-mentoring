import { getCart } from "../cart.repository";

export async function calculateTotal(req: any, res: any, next: any) {
  const userId = req.header("x-user-id");

  if (req.path.endsWith("/checkout")) {
    return next();
  }

  try {
    const cart = await getCart(userId);
    let total = 0;

    console.log(cart.isDeleted);
    if (cart && cart.items && !cart.isDeleted) {
      cart.items.forEach((item) => (total += item.count * item.product.price));
    }

    res.locals.total = total;
    next();
  } catch (err) {
    next(err);
  }
}
