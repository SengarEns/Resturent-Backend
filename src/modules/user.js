import mongoose from "mongoose";

const userShemas = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  // name: {
//   role: {
//     type: String,
//     enum: ["owner","admin","subadmin","user"],
//     required: true,
//   },
});


export const User = mongoose.model("User", userShemas);