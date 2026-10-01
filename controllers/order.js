import { asyncWrapper } from "../middleware/asyncWrapper.js";
import ORDER from "../models/order.js";
import { AppError } from "../utils/appError.js";

const getOrders = asyncWrapper(async (req, res, next) => {
  const orders = await ORDER.find({});
  res.json({
    status: "success",
    data: orders,
  });
});
const getOrderById = asyncWrapper(async (req, res, next) => {
    const order = await ORDER.findById(req.params.id);
    if (!order) {
        return next(new AppError("Order not found", 404));
    }
    res.json({
        status: "success",
        data: order,
    });
});
const addOrder = asyncWrapper(async (req, res, next) => {
    const order = await ORDER.create(req.body);
    res.json({
        status: "success",
        data: order,
    });
});
const updateOrder = asyncWrapper(async (req, res, next) => {
    const order = await ORDER.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });
    if (!order) {
        return next(new AppError("Order not found", 404));
    }
    res.json({
        status: "success",
        data: order,
    });
});
const deleteOrder = asyncWrapper(async (req, res, next) => {
    const order = await ORDER.findByIdAndDelete(req.params.id);
    if (!order) {
        return next(new AppError("Order not found", 404));
    }
    res.json({
        status: "success",
        data: order,
    });
});

export { getOrders, getOrderById, addOrder, updateOrder, deleteOrder };
