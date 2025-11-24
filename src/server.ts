import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from "./routes/auth";
import proRoute from "./routes/product.route";
import orderRoute from "./routes/order.route";

dotenv.config();

const app = express();
const port = process.env.PORT;



app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use(cookieParser());

// configViewEngine(app); 

app.use(express.json());  // parse body JSON
app.use(express.urlencoded());  // parse form data


app.use('/user', userRoute);
app.use('/product', proRoute);
app.use('/order', orderRoute);

//use static file img
app.use('/static', express.static('/Users/admin/Documents/PhatTrienDA/'));

app.listen(port, () => {
    console.log("running port ", port);
})



 
const handleSeverShutdown = async () => {
  try {
    console.log("Server shutdown");
    process.exit(0);
  }
  catch (e) {
    console.log("Error during server shutdown", e);
  }
}



process.on('SIGTERM', handleSeverShutdown);
process.on('SIGINT', handleSeverShutdown);