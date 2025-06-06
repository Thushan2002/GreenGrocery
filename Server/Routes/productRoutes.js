import express from "express"
import { upload } from "../Configs/multer.js"
import authSeller from "../Middlewares/authSeller.js"
import { addProduct, changeStock, productById, productList } from "../Controllers/productController.js"

const productRouter = express.Router()

productRouter.post('/add', upload.array("images"), authSeller, addProduct)
productRouter.get("/list", productList)
productRouter.get("/id", productById)
productRouter.get("/stock", authSeller, changeStock)

export default productRouter