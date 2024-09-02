import express from "express";
import Waiter from "../modules/waiter.js";
import Orders from "../modules/orders.js";

const router = express.Router();

// waiter featched data
router.post("/create", async (req, res) => {
  try {
    const { name, phoneNumber } = req.body;
    if (!name || !phoneNumber) {
      return res
        .status(400)
        .json({ success: false, message: "name and phoneNumber are required" });
    }
    const isWaiterExist = await Waiter.findOne({
      waiter_Phonenumber: phoneNumber,
    });
    const newWaiter = new Waiter({
      waiter_name: name,
      waiter_Phonenumber: phoneNumber,
    });
    await newWaiter.save();
    res.status(201).json({
      success: true,
      message: "waiter added successfully",
      data: newWaiter,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// waiter mark meal served

router.patch("/:waiter_id/:order_id", async (req, res) => {
  try {
    const { waiter_id, order_id } = req.params;
    const updatedOrder = await Orders.findOneAndUpdate(
      { _id: order_id },
      {
        isServed: true,
        servedBy: waiter_id,
      }
    );
    if (!updatedOrder) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }
    if (updatedOrder?.isComplete === false) {
      return res
        .status(400)
        .json({ success: false, message: "Order is not complete from chef" });
    }
    res
      .status(200)
      .json({ success: true, message: "updated order", data: updatedOrder });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

router.get("/allwaiters", async (req, res) => {
  try {
    const allwaiters = await Waiter.find({});
    res.json({ success: true, data: allwaiters });
  } catch (error) {
    console.log(error);
    res.status(500);
    // .json({ success: false, message: "Server error", data: allChefs });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { phoneNumber } = req.body;

    const isExist = await Waiter.findOne({ waiter_Phonenumber: phoneNumber });
    if (!isExist) {
      return res
        .status(404)
        .json({ success: false, message: "Waiter not found" });
    }
    res.status(200).json({ success: true, data: isExist });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: true });
  }
});






export default router;