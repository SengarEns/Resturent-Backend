import express from "express";
import Customer from "../modules/customer.js";
import {
  AlreadyCostumerValidation,
  NewCostumerValidation,
} from "../middleware/validations.js";

const router = express.Router();

router.post("/new", async (req, res) => {
  try {
    const { name, phone, email } = req.body;
    if (!name || !phone || !email) {
      return res
        .status(200)
        .json({ success: false, message: "All fields are required" });
    }
    const isExist = await Customer.findOne({
      customer_name: name,
      customer_email: email,
      customer_phone_no: phone,
    });
    if (isExist) {
      return res.status(200).json({
        success: true,
        massage: "customer already exists",
        data: isExist,
      });
    }
    const newCostumer = new Customer({
      customer_name: name,
      customer_email: email,
      customer_phone_no: phone,
    });
    await newCostumer.save();
    res.status(201).json({
      success: true,
      message: "New customer created",
      data: newCostumer,
    });
  } catch (error) {
    res.status(200).json({ success: false, message: "error", error: error });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { phone } = req.body;
    const findUser = await Customer.findOne({
      customer_phone_no: phone,
    });
    console.log(findUser);
    if (!findUser) {
      return res
        .status(200)
        .json({ success: false, message: "customer not found" });
    }
    console.log("customer", findUser);
    res
      .status(200)
      .json({ success: true, message: "Customer found", data: findUser });
  } catch (error) {
    res.status(200).json({ success: false, message: "error", error: error });
  }
});


router.get("/allcustumer", async (req, res) => {
  try {
    const allCustumer = await Customer.find({});
    res.status(200).json({ success: true, message: "All custumer", data: allCustumer });
  } catch (error) {
    console.log(error);
  }
})


export default router;
