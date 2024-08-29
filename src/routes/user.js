import express from "express";
import LoginHandler from "../controllers/loginHandler.js";
import SignUpHandler from "../controllers/signUpHandler.js";

const router = express.Router();

router.post("/login", LoginHandler, SignUpHandler)

export default router;
