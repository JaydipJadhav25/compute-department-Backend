import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    content: {
      type: String, // could be markdown, HTML, or rich-text JSON
      required: true,
    },
    author: {
      type: String,
      default: "Admin", // or you can reference a User model
    },
    imgUrl: {
      type: String, // blog cover image
      default: "",
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    
  
  },
  { timestamps: true } // adds createdAt & updatedAt automatically
);

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
