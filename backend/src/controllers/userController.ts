import { Request, Response } from "express";
import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/db.js";
import { env } from "../config/env.js";

const signupSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
});

export const signup = async (req: Request, res: Response) => {
  const { username, password } = signupSchema.parse(req.body);
  const normalizedUsername = username.trim();

  const existingUser = await UserModel.findOne({ username: normalizedUsername });
  if (existingUser) {
    return res.status(409).json({
      msg: "Username is already taken",
      message: "Username is already taken",
    });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  await UserModel.create({
    username: normalizedUsername,
    password: hashedPassword,
  });

  res.status(201).json({ msg: "User created successfully" });
};

const signinSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const signin = async (req: Request, res: Response) => {
  const { username, password } = signinSchema.parse(req.body);
  const normalizedUsername = username.trim();

  // FIX: Explicitly select the password field which is excluded by default
  const user = await UserModel.findOne({ username: normalizedUsername }).select("+password");
  if (!user) {
    return res.status(404).json({ msg: "User not found" });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return res.status(401).json({ msg: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user._id }, env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.status(200).json({ msg: "Login successful", token });
};
