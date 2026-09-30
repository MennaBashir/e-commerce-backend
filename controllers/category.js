import CATEGORY from "../models/category.js";
import { ERROR, SUCCESS } from "../utils/httpStatus.js";

const getCategories = async (req, res) => {
  try {
    const categories = await CATEGORY.find();
    res.json({
      status: SUCCESS,
      data: categories,
    });
  } catch (err) {
    res.status(500).json({
      status: ERROR,
      message: err.message,
    });
  }
};
const addCategory = async (req, res) => {
  try {
    console.log("eq.body",req.body)
    const category = new CATEGORY(req.body);
    await category.save();
    res.status(201).json({
      status: SUCCESS,
      data: category,
    });
  } catch (err) {
    res.status(500).json({
      status: ERROR,
      message: err.message,
    });
  }
};
const updateCategory = () => {};
const deleteCategory = () => {};

export { getCategories, addCategory, updateCategory, deleteCategory };
