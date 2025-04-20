import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  imgurl: {
    type: String,
    required: true,
  },
  googlelink: {
    type: String,
    required: true,
  },
});



  const Events = mongoose.model("Events", eventSchema)
  export default Events;