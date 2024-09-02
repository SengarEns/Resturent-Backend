import express from "express";
import Chef from "../modules/chef.js";

const router = express.Router();

router.post("/new-chef", async (req, res) => {
  const { name } = req.body;
  if (!name)
    return res
      .status(404)
      .json({ success: false, message: "name is required" });

  try {
    const isChefExist = await Chef.findOne({ chef_name: name });
    if (isChefExist)
      return res
        .status(409)
        .json({ success: false, message: "chef already exists" });
    const newChef = new Chef({ chef_name: name });
    await newChef.save();
    res
      .status(201)
      .json({ success: true, message: "new chef created", data: newChef });
  } catch (error) {
    console.log(error);
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
