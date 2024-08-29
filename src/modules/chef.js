import mongoose, { mongo, Schema } from "mongoose";

const chefSchema = new mongoose.Schema({
  chef_name: {
    type: String,
    required: true,
  },
});

const Chef = mongoose.model("Chef", chefSchema);

export default Chef;
