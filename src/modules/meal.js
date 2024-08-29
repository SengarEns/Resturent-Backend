import mongoose, { mongo, Schema } from "mongoose";

const mealSchema = new mongoose.Schema({
  meal_name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  made_by:{
    type:Schema.Types.ObjectId
  }
});


const Meals = mongoose.model("Meals", mealSchema);

export default Meals;
