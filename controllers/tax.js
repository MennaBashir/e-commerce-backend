import { asyncWrapper } from "../middleware/asyncWrapper.js";
import TAX from "../models/tax.js";
import { AppError } from "../utils/appError.js";
import { SUCCESS } from "../utils/httpStatus.js";

const getTaxes = asyncWrapper(async (req, res, next) => {
  const taxes = await TAX.find({}, { __v: false });
  res.json({
    status: SUCCESS,
    data: taxes,
  });
});
const addTax = asyncWrapper(async (req, res, next) => {
  const tax = new TAX(req.body);
  await tax.save();
  res.status(201).json({
    status: SUCCESS,
    data: tax,
  });
});
const updateTax = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const tax = await TAX.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!tax) {
    return next(new AppError(`No tax found with id ${id}`, 404));
  }
  res.json({
    status: SUCCESS,
    data: tax,
  });
});
const deleteTax = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const tax = await TAX.findByIdAndDelete(id);
  if (!tax) {
    return next(new AppError(`No tax found with id ${id}`, 404));
  }
  res.json({
    status: SUCCESS,
    message: "Tax deleted successfully",
  });
});

export { getTaxes, addTax, updateTax, deleteTax };
