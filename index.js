import dotenv from "dotenv"
dotenv.config();
import express from "express"
import cors from "cors"
import connectDB from "./config/db.js";
import adminRouter from "./routes/admin.routes.js"
import openRouter from "./routes/open.routes.js"
import serverless from "serverless-http";  // Only needed for Vercel


const app = express();
connectDB();

//middleware
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cors());


app.get("/" , async(req , res) =>{

    return res.send("<h1>Computer Department </h1>");
})
app.get('/my', (req, res) => {
  res.json({ message: 'It works!' });
});

//routing
app.use("/admin" , adminRouter);
app.use("/open" , openRouter);



// app.listen(process.env.PORT , ()=>{
//     console.log(`server running on port ${process.env.PORT} 🚀`)
// })


// For local development (non-serverless):
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// For Vercel serverless (exporting handler)
let handler;
if (process.env.VERCEL) {
  handler = serverless(app); // Assign the handler for serverless
}
export { handler }; // Export the handler outside the block