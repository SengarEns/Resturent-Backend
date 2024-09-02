import express from "express";
import loginRouter from "./src/routes/user.js";
import customerRouter from "./src/routes/customerRouter.js";
import mealsRouter from "./src/routes/mealsRoutes.js";
import chefRouter from "./src/routes/chefRouter.js";
import orderRouter from "./src/routes/orderRouter.js";
import waiterRouter from "./src/routes/waiterRouter.js";
import mongoose from "mongoose";
import 'dotenv/config'
import cors from "cors"

const app = express();
// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors('*'))
// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Mount the router at /api
app.use("/api", loginRouter);
app.use("/customer", customerRouter);
app.use("/chef",chefRouter);
app.use("/meal", mealsRouter);
app.use("/order", orderRouter);
app.use("/waiter", waiterRouter);

mongoose
  .connect(
    "mongodb+srv://pranjalsengar:pranjalsengar@cluster0.gdh4ggy.mongodb.net/AUSO?retryWrites=true&w=majority&appName=Cluster0",
  )
  .then(() => {
    console.log("moongoose connected");
    app.listen(8000, () => {
      console.log("listening on port 8000");
    });
  });
