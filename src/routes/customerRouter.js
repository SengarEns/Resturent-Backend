import express from "express";
import Customer from "../modules/customer.js";
import {
  AlreadyCostumerValidation,
  NewCostumerValidation,
} from "../middleware/validations.js";

const router = express.Router();

router.post("/new", NewCostumerValidation, async (req, res) => {
  const { name, phone, email } = req.body;
  if (!name || !phone || !email) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }
  try {
    const isExist = await Customer.findOne({
      customer_name: name,
      customer_email: email,
      customer_phone_no: phone,
    });
    if (isExist) {
      return res
        .status(200)
        .json({ success: true, massage: "customer already exists" });
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
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  const { phone } = req.body;
  try {
    const findUser = await Customer.findOne({
      customer_phone_no: phone,
    });
    if (!findUser) {
      return res
        .status(404)
        .json({ success: false, message: "customer not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Customer found", data: findUser });
  } catch (error) {
    console.error(error);
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
