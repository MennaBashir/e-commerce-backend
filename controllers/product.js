import { asyncWrapper } from "../middleware/asyncWrapper.js";
import PRODUCT from "../models/product.js";
import { SUCCESS } from "../utils/httpStatus.js";

const getProducts = asyncWrapper(async (req, res, next) => {
  const products = await PRODUCT.find();
  res.json({
    status: SUCCESS,
    data: products,
  });
});
const getProductById = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return next(new AppError("Product ID is required", 400));
  }
  const product = await PRODUCT.findById(id);
  res.json({
    status: SUCCESS,
    data: product,
  });
});
const addProduct = asyncWrapper(async (req, res, next) => {
  const product = new PRODUCT(req.body);
  await product.save();
  res.status(201).json({
    status: SUCCESS,
    data: product,
  });
});
const updateProduct = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const product = await PRODUCT.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product) {
    return next(new AppError(`No product found with id ${id}`, 404));
  }
  res.json({
    status: SUCCESS,
    data: product,
  });
});
const deleteProduct = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const product = await PRODUCT.findByIdAndDelete(id);
  if (!product) {
    return next(new AppError(`No product found with id ${id}`, 404));
  }
  res.json({
    status: SUCCESS,
    data: product,
  });
});

export {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};
