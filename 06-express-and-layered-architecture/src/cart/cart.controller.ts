import express from "express";
import * as cartService from "./cart.service";
import * as orderService from "./order/order.service";
import joi from "joi";
import { calculateTotal } from "./middleware/cart.middleware";
import { checkIfUserExists } from "./middleware/auth.middleware";

const cartUpdateSchema = joi.object({
  productId: joi.string().required(),
  count: joi.number().required(),
});

const router = express.Router();
router.use("/api/profile/cart", checkIfUserExists);

router.get("/api/profile/cart", async (req, res) => {
  const userId = res.locals.user;
  const total = res.locals.total;

  try {
    const cart = await cartService.getOrCreateCart(userId as string);
    res.json({ cart, total });
  } catch (err) {
    res.status(500).send((err as Error).message);
  }
});

router.put("/api/profile/cart", async (req, res) => {
  const userId = res.locals.user;
  const item = req.body;
  const total = res.locals.total;

  const { error } = cartUpdateSchema.validate(item);
  if (error) {
    return res.status(400).send("Invalid items provided");
  }

  try {
    const cart = await cartService.updateCart(userId, item);
    res.status(201).json({ cart, total });
  } catch (err) {
    res.status(500).send((err as Error).message);
  }
});

router.delete("/api/profile/cart", async (req, res) => {
  const userId = res.locals.user;

  try {
    await cartService.deleteCart(userId);
    res.status(204).json({ success: true });
  } catch (err) {
    res.status(500).send((err as Error).message);
  }
});

router.post("/api/profile/cart/checkout", async (req, res) => {
  const userId = res.locals.user;
  const { payment, delivery, comments } = req.body;

  try {
    const order = await orderService.createOrder(
      userId,
      payment,
      delivery,
      comments
    );
    res.json(order);
  } catch (err) {
    res.status(500).send((err as Error).message);
  }
});

export default router;
