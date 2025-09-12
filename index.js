import dotenv from "dotenv"
dotenv.config();
import express from "express"
import cors from "cors"

import connectDB from "./config/db.js";
import adminRouter from "./routes/admin.routes.js"
import openRouter from "./routes/open.routes.js"
// import serverless from "serverless-http";  // Only needed for Vercel
// import mongoose from "mongoose";


import swaggerUi from "swagger-ui-express";
import { readFileSync } from "fs";
import { Activity } from "./model/activity.js";
import Blog from "./model/Blog.js";
import mongoose from "mongoose";




// Load swagger-output.json without import assert
const swaggerFile = JSON.parse(
  readFileSync(new URL("./swagger-output.json", import.meta.url))
);


const app = express();

// MongoDB Connection with Serverless Optimization
// let isConnected = false;

// const connectDB = async () => {
//   if (isConnected) return;
  
//   try {
//     await mongoose.connect(process.env.MONGO_URI, {
//       serverSelectionTimeoutMS: 5000, // 5-second timeout
//       maxPoolSize: 1 // Important for serverless
//     });
//     isConnected = true;
//     console.log("MongoDB Connected");
//   } catch (error) {
//     console.error("Connection failed:", error.message);
//     process.exit(1);
//   }
// };

// Initialize connection before handling requests



 connectDB().then((res)=>{

  app.listen(process.env.PORT || 5000 , ()=>{
    console.log(`server running on port ${process.env.PORT} 🚀`)
})


 })
 .catch((err)=>{
  console.log("error : " , err);
  process.exit(1);
 })



// Swagger docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));


//middleware
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cors());

// const blogs = [
//   {
//     title: "Exploring React Query",
//     description: "Learn how to manage server state with React Query effectively.",
//     content: "This blog explains caching, pagination, and background updates with React Query.",
//     author: "CESA Team",
//     imgUrl: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg",
//     tags: ["React", "Frontend"]
//   },
//   {
//     title: "Introduction to MongoDB",
//     description: "Step by step tutorial for MongoDB beginners.",
//     content: "Learn collections, documents, and queries in MongoDB.",
//     author: "John Doe",
//     imgUrl: "https://images.pexels.com/photos/574077/pexels-photo-574077.jpeg",
//     tags: ["MongoDB", "Database"]
//   },
//   {
//     title: "Getting Started with Express.js",
//     description: "A beginner friendly guide to Express framework.",
//     content: "We cover middleware, routing, and API creation in Express.js.",
//     author: "Jane Smith",
//     imgUrl: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg",
//     tags: ["Express", "Backend"]
//   },
//   {
//     title: "Understanding Async/Await",
//     description: "Deep dive into JavaScript asynchronous programming.",
//     content: "Callbacks vs Promises vs Async/Await explained with examples.",
//     author: "Alice",
//     imgUrl: "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg",
//     tags: ["JavaScript", "Async"]
//   },
//   {
//     title: "Building REST APIs",
//     description: "How to design and implement RESTful APIs.",
//     content: "Covers endpoints, CRUD, and best practices.",
//     author: "Bob",
//     imgUrl: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg",
//     tags: ["API", "REST"]
//   },
//   {
//     title: "Mastering JavaScript ES6",
//     description: "ES6 features every developer must know.",
//     content: "Let, const, arrow functions, destructuring and more.",
//     author: "CESA Team",
//     imgUrl: "https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg",
//     tags: ["JavaScript", "ES6"]
//   },
//   {
//     title: "Frontend vs Backend",
//     description: "Clear the confusion between frontend and backend dev.",
//     content: "Responsibilities, technologies, and tools compared.",
//     author: "Jane Smith",
//     imgUrl: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg",
//     tags: ["Frontend", "Backend"]
//   },
//   {
//     title: "State Management in React",
//     description: "Understanding state management techniques in React.",
//     content: "Covers useState, Context API, Redux, and Zustand.",
//     author: "John Doe",
//     imgUrl: "https://images.pexels.com/photos/1181313/pexels-photo-1181313.jpeg",
//     tags: ["React", "State"]
//   },
//   {
//     title: "Deploying with Docker",
//     description: "Docker basics for developers.",
//     content: "Images, containers, and docker-compose explained.",
//     author: "Alice",
//     imgUrl: "https://images.pexels.com/photos/1261427/pexels-photo-1261427.jpeg",
//     tags: ["Docker", "DevOps"]
//   },
//   {
//     title: "Web Security Basics",
//     description: "Essential web security practices.",
//     content: "Covers XSS, CSRF, SQL Injection, and secure coding.",
//     author: "Bob",
//     imgUrl: "https://images.pexels.com/photos/5380643/pexels-photo-5380643.jpeg",
//     tags: ["Security", "Web"]
//   },
//   {
//     title: "Pagination with React Query",
//     description: "Efficient pagination in React apps.",
//     content: "React Query pagination with API integration.",
//     author: "CESA Team",
//     imgUrl: "https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg",
//     tags: ["Pagination", "React"]
//   },
//   {
//     title: "Understanding JWT",
//     description: "Secure authentication with JWT.",
//     content: "Covers token generation, verification, and usage.",
//     author: "Jane Smith",
//     imgUrl: "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg",
//     tags: ["Auth", "JWT"]
//   },
//   {
//     title: "Introduction to TailwindCSS",
//     description: "Quick guide to Tailwind utility-first CSS.",
//     content: "Setup, configuration, and styling examples.",
//     author: "John Doe",
//     imgUrl: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg",
//     tags: ["CSS", "Tailwind"]
//   },
//   {
//     title: "React Hooks Deep Dive",
//     description: "Comprehensive guide to React Hooks.",
//     content: "useEffect, useMemo, useCallback explained.",
//     author: "Alice",
//     imgUrl: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg",
//     tags: ["React", "Hooks"]
//   },
//   {
//     title: "API Rate Limiting",
//     description: "Protecting APIs with rate limiting.",
//     content: "Implementing with Express middleware.",
//     author: "Bob",
//     imgUrl: "https://images.pexels.com/photos/3862371/pexels-photo-3862371.jpeg",
//     tags: ["API", "RateLimit"]
//   },
//   {
//     title: "Optimizing Web Performance",
//     description: "Tips for faster websites.",
//     content: "Lazy loading, caching, and code splitting.",
//     author: "Jane Smith",
//     imgUrl: "https://images.pexels.com/photos/1591060/pexels-photo-1591060.jpeg",
//     tags: ["Performance", "Optimization"]
//   },
//   {
//     title: "Introduction to Git Hooks",
//     description: "Automating tasks with Git Hooks.",
//     content: "Pre-commit and pre-push hook examples.",
//     author: "John Doe",
//     imgUrl: "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg",
//     tags: ["Git", "Hooks"]
//   },
//   {
//     title: "SSR with Next.js",
//     description: "Introduction to server-side rendering.",
//     content: "Differences between CSR, SSR, and SSG.",
//     author: "CESA Team",
//     imgUrl: "https://images.pexels.com/photos/1181255/pexels-photo-1181255.jpeg",
//     tags: ["Next.js", "SSR"]
//   },
//   {
//     title: "Database Indexing Explained",
//     description: "Why indexing matters in databases.",
//     content: "Index types and performance benefits.",
//     author: "Alice",
//     imgUrl: "https://images.pexels.com/photos/1181359/pexels-photo-1181359.jpeg",
//     tags: ["Database", "Indexing"]
//   },
//   {
//     title: "Building a Blog with MERN",
//     description: "Step by step MERN blog tutorial.",
//     content: "MongoDB, Express, React, and Node in one project.",
//     author: "Bob",
//     imgUrl: "https://images.pexels.com/photos/3862130/pexels-photo-3862130.jpeg",
//     tags: ["MERN", "Blog"]
//   }
// ];

// async function seedBlogs() {
//   try {
//     await Blog.insertMany(blogs);
//     console.log("✅ 20 Blogs inserted successfully!");
//   } catch (err) {
//     console.error("❌ Error inserting blogs:", err);
//   }
// }

// seedBlogs();


app.get("/" , async(req , res) =>{
    
    return res.send("<h1>Computer Department </h1>");
});

app.get('/my', (req, res) => {
  res.json({ message: 'It works!' });
});


//routing
app.use("/admin" , adminRouter);
app.use("/open" , openRouter);


// Error handling middleware //custom erro handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  const errorName = err.name || "validation Error";
  const errorMessage = err.message || "Something went wrong";
  const statusCode = err.status || 500;
  // res.status(500).json({ error: "Something went wrong!" });

   return res.status(statusCode)
             .json({
              message : errorMessage,
              error : errorName,
              success : false
             })

});



// app.listen(process.env.PORT || 5000 , ()=>{
//     console.log(`server running on port ${process.env.PORT} 🚀`)
// })


// For local development (non-serverless):
// if (!process.env.VERCEL) {
//   const PORT = process.env.PORT || 5000;
//   app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//   });
// }


// For Vercel serverless (exporting handler)
// let handler;
// if (process.env.VERCEL) {
//   handler = serverless(app); // Assign the handler for serverless
// }
// export { handler }; // Export the handler outside the block

// Serverless export (MUST be default)
//const handler = serverless(app);
//export default handler; // 🚀 Critical fix here











////////////////////////////////////////////////////////////////////



// import 'dotenv/config';
// import express from 'express';
// import mongoose from 'mongoose';
// import serverless from 'serverless-http';

// const app = express();

// // 1. Database Connection with Debugging
// console.log('Attempting MongoDB connection...'); // Add this

// const connectDB = async () => {
//   try {
//   // Add connection options
//       await mongoose.connect(process.env.MONGODB_URI, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         serverSelectionTimeoutMS: 5000 // 5-second timeout
//       });
//     console.log('MongoDB Connected Successfully');
//   } catch (error) {
//     console.error('MongoDB Connection Failed:', error.message);
//     process.exit(1);
//   }
// };

// // 2. Immediate Connection Attempt
// (async () => {
//   await connectDB();
// })();

// // 3. Basic Route with Logging
// app.get('/', (req, res) => {
//   console.log('Root route hit'); // Add this
//   res.send('<h1>Computer Department</h1>');
// });

// // 4. Error Handling Middleware
// app.use((err, req, res, next) => {
//   console.error('Server Error:', err);
//   res.status(500).json({ error: 'Internal Server Error' });
// });

// // 5. Export Handler with Logging
// console.log('Exporting handler...'); // Add this
// const handler = serverless(app);
// export default handler;