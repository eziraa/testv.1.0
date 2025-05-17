import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User";

import { SignUpSchema } from "../validators/auth.validator";

class AuthController {
  // METHOD: to sign up
  async signUp(req: Request, res: Response) {
    try {
      const validatedData = SignUpSchema.parse(req.body);

      // Check if user already exists
      const existingUser = await User.findOne({ email: validatedData.email });
      if (existingUser) {
        res.status(400).json({ message: "User already exists" });
      }
      const hashedPassword = await bcrypt.hash(validatedData.password, 10);
      const newUser = new User({
        username: validatedData.username,
        email: validatedData.email,
        password: hashedPassword,
      });
      await newUser.save();
      res.status(201).json(newUser);
    } catch (error) {
      if (error instanceof Error && "errors" in error) {
        res.status(400).json({
          message: "Validation failed",
          errors: (error as any).errors,
        });
      }
      res.status(500).json({ message: "Internal Server Error", error });
    }
  }

  // METHOD: to log in
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      // Compare with hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(401).json({ message: "Invalid credentials" });
      }
      const authTokens = user.generateAuthToken()
      res.setHeader("Authorization", `Bearer ${authTokens.accessToken}`);
      res.status(200).json({ message: "Login successful", user , authTokens});
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error });
    }
  }

  // METHOD: to get user profile
  async getMe(req: Request, res: Response) {
    try {
      const userId = req.userId;
      if (!userId) {
        res.status(401).json({ message: "Unauthorized please login" });
        return;
      }
      const user = await User.findById(userId);
      if (!user) {
        res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error });
    }
  }

  // METHOD: to update user profile
  async updateUserProfile(req: Request, res: Response) {
    try {
      const userId = req.userId;

      if(!userId){
        res.status(401).json({ message: "Unauthorized please login" });
      }
      const updatedData = req.body;
      const user = await User.findByIdAndUpdate(userId, updatedData, {
        new: true,
      });
      if (!user) {
        res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error });
    }
  }
  
}

export default new AuthController();
