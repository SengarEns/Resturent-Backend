import bcrypt from "bcryptjs/dist/bcrypt.js";
import { User } from "../modules/user.js";
import jwt from "jsonwebtoken";

const SignUpHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const newUser = new User({ email, password });
    newUser.password = await bcrypt.hash(password, 10);

    await newUser.save();
    res
      .status(201)
      .json({ successs: true, message: "new user created", data: newUser });
  } catch (error) {
    console.error("LOGIN ERROR", error);
    res.status(500).json({ message: "Server error" });
  }
};

export default SignUpHandler;
