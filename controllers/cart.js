import { asyncWrapper } from "../middleware/asyncWrapper.js";
import CART from "../models/cart.js";
import { AppError } from "../utils/appError.js";

const getCartItems = asyncWrapper(async (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    throw new AppError("User ID is required", 400);
  }
  const cart = await CART.findOne({ user: userId });
  if (!cart) {
    throw new AppError("Cart not found", 404);
  }
  cart.totalPrice = cart.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  await cart.save();

  res.json({
    status: "success",
    data: cart,
  });
});

// shape of req.body {product: "productId", quantity: 1}
const addToCart = asyncWrapper(async (req, res) => {
  const { userId } = req.params;
  const { product, quantity, price } = req.body;
  const cart = await CART.findOne({ user: userId });
  if (!cart) {
    const newCart = new CART({
      user: userId,
      items: [{ product, quantity, price: price }],
    });
    await newCart.save();
    return res.json({
      status: "success",
      data: newCart,
    });
  }
  const found = cart.items.find(
    (item) => item.product.toString() === product.toString(),
  );
  if (found) {
    found.quantity = quantity;
    found.price = price;
  } else {
    cart.items.push({ product, quantity, price });
  }
  await cart.save();
  res.json({
    status: "success",
    data: cart,
  });
});

const removeFromCart = asyncWrapper(async (req, res) => {
  const { userId, productId } = req.params;
  const cart = await CART.findOne({ user: userId });
  if (!cart) {
    throw new AppError("Cart not found", 404);
  }
  const products = cart.items.filter(
    (item) => item.product.toString() !== productId.toString(),
  );
  cart.items = products;
  await cart.save();
  res.json({
    status: "success",
    data: cart,
  });
});

export { getCartItems, addToCart, removeFromCart };
