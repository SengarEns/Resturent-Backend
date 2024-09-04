import express from "express";
import Chef from "../modules/chef.js";

const router = express.Router();

router.post("/create", async (req, res) => {
  const { name, phone } = req.body;
  if (!name)
    return res
      .status(200)
      .json({ success: false, message: "name is required" });
  if (!phone)
    return res
      .status(200)
      .json({ success: false, message: "phone is required" });

  try {
    const isChefExist = await Chef.findOne({
      chef_name: name,
      chef_phone: phone,
    });
    if (isChefExist)
      return res
        .status(409)
        .json({ success: false, message: "chef already exists" });
    const newChef = new Chef({ chef_name: name, chef_phone: phone });
    await newChef.save();
    res
      .status(201)
      .json({ success: true, message: "new chef created", data: newChef });
  } catch (error) {
    console.log(error);
  }
});

router.post("/cheflogin", async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone) {
      res
        .status(200)
        .json({ success: false, message: "Please enter a phone number" });
    }

    console.log("jkl");
    const chef = await Chef.findOne({ chef_phone: phone });

    if (!chef) {
      res.status(200).json({ success: false, message: "Chef not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Login successful", data: chef });
  } catch (error) {
    console.log(error);
    res.status(200).json({ success: false, message: "Error in login" });
  }
});

router.get("/find/:chefId", async (req, res) => {
  try {
    const { chefId } = req.params;
    //   console.log(chefId);
    const fetchChef = await Chef.findById(chefId);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.get("/allchef", async (req, res) => {
  try {
    const allChefs = await Chef.find({});
    res.json({ success: true, data: allChefs });
  } catch (error) {
    console.log(error);
    res.status(500);
    // .json({ success: false, message: "Server error", data: allChefs });
  }
});



export default router;
