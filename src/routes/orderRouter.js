import express from "express";
import Orders from "../modules/orders.js";
import Customer from "../modules/customer.js";
import Meals from "../modules/meal.js";
import Chef from "../modules/chef.js";

const router = express.Router();

// create order
router.post("/:customerId/all-meals/:customer_mealId", async (req, res) => {
  const { customerId } = req.params;
  const { customer_mealId } = req.params;
  try {
    const isCustomerExist = await Customer.findById(customerId);
    const MealDetails = await Meals.findById(customer_mealId);
    //   console.log(customerId, isChefExist);
    if (!isCustomerExist)
      return res
        .status(404)
        .json({ success: false, message: "Customer does not exist" });

    if (!MealDetails)
      return res
        .status(404)
        .json({ success: false, message: "Meal does not exist" });

    const newOrder = new Orders({ customer_Id: customerId, customer_mealId });
    await newOrder.save();

    res.status(200).json({
      success: true,
      message: "your meal is ordered",
      data: newOrder,
    });
  } catch (error) {
    console.log(error);
  }
});

// Show to chef all orders
router.post("/:chefId/orderlist", async (req, res) => {
  try {
    const { chefId } = req.params;
    const isChefExist = await Chef.findById(chefId);

    if (!isChefExist) {
      return res
        .status(404)
        .json({ success: false, message: "Chef does not exist" });
    }

    const orders = await Orders.find();

    const allOrders = [];

    for (let i = 0; i < orders.length; i++) {
      const meal = await Meals.findById(orders[i].customer_mealId);
      allOrders.push(meal);
    }
    res.status(200).json({
      success: true,
      message: " all Order fetched successfully",
      data: allOrders,
      orders: orders,
    });
  } catch (error) {}
});

// confirm order
router.post("/:chefId/orderlist/:mealId", async (req, res) => {
  try {
    const { chefId, mealId } = req.params;

    const isChefExist = await Chef.findById(chefId);
    if (!isChefExist) {
      return res
        .status(404)
        .json({ success: false, message: "Chef does not exist" });
    }

    const isMealExist = await Meals.findById(mealId);
    if (!isMealExist) {
      return res
        .status(404)
        .json({ success: false, message: "Meal does not exist" });
    }

    const updateOrder = await Orders.updateOne(
      { customer_mealId: mealId },
      { isComplete: true }
    );
    console.log(updateOrder);

    res
      .status(200)
      .json({ success: true, message: "Order updated successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

export default router;
31;