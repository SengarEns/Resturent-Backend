import mongoose, {Schema } from "mongoose";

const waiterSchema = new mongoose.Schema({
  waiter_name: {
    type: String,
    required: true,
  },
  waiter_Phonenumber:{
    type: Number,
    required: true,
  }
});

const Waiter = mongoose.model("Waiter", waiterSchema);

export default Waiter;
