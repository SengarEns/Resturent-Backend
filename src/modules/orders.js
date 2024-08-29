import mongoose, { Schema } from "mongoose";


const orderSchema = new mongoose.Schema({
    customer_Id :{
        type: Schema.Types.ObjectId,
        ref: "Customer"
    },
    customer_mealId:{
        type: Schema.Types.ObjectId,
        ref: "Meals"
    },
    isComplete:{
        type: Boolean,
        default: false
    },
    isServed:{
        type: Boolean,
        default: false
    },
    servedBy:{
        type: Schema.Types.ObjectId,
        ref: "Waiter"
    }
});

const Orders = mongoose.model("Orders", orderSchema);

export default Orders
