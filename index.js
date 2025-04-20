import dotenv from "dotenv"
dotenv.config();
import express from "express"
import cors from "cors"
import connectDB from "./config/db.js";
import adminRouter from "./routes/admin.routes.js"
import openRouter from "./routes/open.routes.js"
import Events from "./model/events.model.js";
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



app.listen(process.env.PORT , ()=>{
    console.log(`server running on port ${process.env.PORT} 🚀`)
})