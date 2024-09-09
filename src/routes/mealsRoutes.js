import express from "express";
import Chef from "../modules/chef.js";
import Meals from "../modules/meal.js";
import Customer from "../modules/customer.js";

const router = express.Router();
router.post("/:chefId/create-meal", async (req, res) => {
  const { chefId } = req.params;
  const { meal_name, price } = req.body;
  try {
    const isChefExist = await Chef.findById(chefId);
    if (!isChefExist)
      return res
        .status(404)
        .json({ success: false, message: "chef does not exist" });

    const isMealExist = await Meals.findOne({ meal_name, price });
    if (isMealExist)
      return res
        .status(200)
        .json({ success: true, message: "Meal is already exist" });

    const newMeal = new Meals({ meal_name, price, made_by: chefId });
    await newMeal.save();
    res
      .status(201)
      .json({ success: true, message: "Meal created", data: newMeal });
  } catch (error) {
    console.log(error);
  }
});

// get for chef
router.get("/:chefId/chef-meals", async (req, res) => {
  const { chefId } = req.params;
  try {
    const isChefExist = await Chef.findById(chefId);
    console.log(chefId, isChefExist);
    if (!isChefExist)
      return res
        .status(404)
        .json({ success: false, message: "chef does not exist" });

    const isMealExist = await Meals.find({ made_by: chefId });
    if (!isMealExist) {
      return res
        .status(404)
        .json({ success: true, message: "you don't have any meals" });
    }
    res
      .status(200)
      .json({ success: true, message: "your meals", data: isMealExist });
  } catch (error) {
    console.log(error);
  }
});


// get for costumer
router.get("/:customerId/all-meals", async (req, res) => {
  const { customerId } = req.params;
  try {
    const isCustomerExist = await Customer.findById(customerId);
    //   console.log(customerId, isChefExist);
    if (!isCustomerExist)
      return res
        .status(404)
        .json({ success: false, message: "Customer does not exist" });

    const isMeal = await Meals.find();
    if (!isMeal) {
      return res.status(200).json({ success: true, message: "no meals" });
    }
    res
      .status(200)
      .json({ success: true, message: "here your all meals", data: isMeal });
  } catch (error) {
    console.log(error);
  }
});

// find meal
router.get("/:meal_id", async (req, res) => {
  try {
    
    const {meal_id} = req.params
    const updateOrder = await Meals.findById(meal_id)
    if(!updateOrder){
      res.status(404).send({message: "meal not found"})
    }

    res.status(200).json({message: "meal found", data: updateOrder})

  } catch (error) {
    console.log(error)
    res.status(500).send({message: "server error", error})
  }


})
export default router;
