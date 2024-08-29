import mongoose, { mongo, Schema } from "mongoose";

const costumerSchema = new mongoose.Schema({
  customer_name: {
    type: String,
  },
  customer_phone_no: {
    type: Number,
  },
  customer_email: {
    type: String,
  },
});

const Customer = mongoose.model("Customer", costumerSchema);

export default Customer;
