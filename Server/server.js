import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors"
import connectDB from "./Configs/db.js";
import dotenv from "dotenv";
import userRouter from "./Routes/userRoute.js";
import sellerRouter from "./Routes/sellerRoutes.js";
import connectCloudinary from "./Configs/cloudinary.js";
import productRouter from "./Routes/productRoutes.js";
import cartRouter from "./Routes/cartRoute.js";
import addressRouter from "./Routes/addressRoutes.js";
import orderRouter from "./Routes/orderRoutes.js";

dotenv.config();

const app = express()

const port = process.env.PORT || 4000
await connectDB()
await connectCloudinary()

const allowedOrigins = ['http://localhost:5173']

// middleware

app.use(express.json())
app.use(cookieParser())
app.use(cors({ origin: allowedOrigins, credentials: true }))

app.get("/", (req, res) => { res.send("API is working") })
app.use("/api/user", userRouter)
app.use("/api/seller", sellerRouter)
app.use("/api/product", productRouter)
app.use("/api/cart", cartRouter)
app.use("/api/address", addressRouter)
app.use("/api/order", orderRouter)

app.use((err, req, res, next) => {
    console.error('Global error handler:', err);
    if (!res.headersSent) {
        res.status(500).json({ success: false, message: err.message || 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})