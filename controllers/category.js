import { asyncWrapper } from "../middleware/asyncWrapper.js";
import CATEGORY from "../models/category.js";
import { AppError } from "../utils/appError.js";
import { SUCCESS } from "../utils/httpStatus.js";

const getCategories = asyncWrapper(async (req, res) => {
  const categories = await CATEGORY.find({},{__v:false});
  res.json({
    status: SUCCESS,
    data: categories,
  });
});

const addCategory = asyncWrapper(async (req, res) => {
  const category = new CATEGORY(req.body);
  await category.save();
  res.status(201).json({
    status: SUCCESS,
    data: category,
  });
});

const updateCategory = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const category = await CATEGORY.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!category) {
    return next(new AppError(`No category found with id ${id}`, 404));
  }
  res.json({
    status: SUCCESS,
    data: category,
  });
});

const deleteCategory = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const category = await CATEGORY.findByIdAndDelete(id);
  if (!category) {
    return next(new AppError(`No category found with id ${id}`, 404));
  }
  res.json({
    status: SUCCESS,
    message: "Category deleted successfully",
  });
});

export { getCategories, addCategory, updateCategory, deleteCategory };
