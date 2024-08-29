import bcrypt from "bcryptjs/dist/bcrypt.js";
import { User } from "../modules/user.js";
import jwt from "jsonwebtoken";

const LoginHandler = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (email && password) {
      const user = await User.findOne({ email });

      if (!user) {
        return next();
        
      }
      const isPassEqual = await bcrypt.compare(password, user.password);
      if (!isPassEqual) {
        return res
          .status(403)
          .json({ success: false, message: "password is incorrect" });
      }

      const jwtToken = jwt.sign(
        { email: user.email, _id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );

      res.status(200).json({
        success: true,
        message: "Login successful",
        token: jwtToken,
        data: user,
      });
    }
  } catch (error) {
    console.error("LOGIN ERROR", error);
    res.status(500).json({ message: "Server error" });
  }
};

export default LoginHandler;
