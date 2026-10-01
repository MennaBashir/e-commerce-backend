import { asyncWrapper } from "../middleware/asyncWrapper.js";
import USER from "../models/user.js";
import { AppError } from "../utils/appError.js";
import { generateToken } from "../utils/generateToken.js";
import { SUCCESS } from "../utils/httpStatus.js";
import bcrypt from "bcryptjs";

const registerUser = asyncWrapper(async (req, res, next) => {
  const { name, email, password, phone, address, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new USER({
    name,
    email,
    password: hashedPassword,
    phone,
    address,
    role,
  });
  const token = generateToken({ id: user._id, role: user.role });
  user.token = token;
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
  const isPasswordValid = user
    ? await bcrypt.compare(password, user.password)
    : false;
  if (!user || !isPasswordValid) {
    return next(new AppError("Invalid email or password", 401));
  }
  const token = generateToken({ id: user._id, role: user.role });
  user.token = token;
  await user.save();

  res.status(201).json({
    status: SUCCESS,
    data: {
      email: user.email,
      name: user.name,
      token,
    },
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
