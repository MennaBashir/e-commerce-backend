import { asyncWrapper } from "../middleware/asyncWrapper.js";
import USER from "../models/user.js";
import { SUCCESS } from "../utils/httpStatus.js";

const registerUser = asyncWrapper(async (req, res, next) => {
  const user = new USER(req.body);
  await user.save();
  res.status(201).json({
    status: SUCCESS,
    data: user,
  });
});

const loginUser = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError("Email and password are required", 400));
  }
  const user = await USER.findOne({ email });
  if (!user || user.password !== password) {
    return next(new AppError("Invalid email or password", 401));
  }
  res.status(201).json({
    status: SUCCESS,
    data: user,
  });
});

const getAllUsers = asyncWrapper(async (req, res, next) => {
  const users = await USER.find({}, { __v: false });
  res.json({
    status: SUCCESS,
    data: users,
  });
});

export { registerUser, loginUser, getAllUsers };
