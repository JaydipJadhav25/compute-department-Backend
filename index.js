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