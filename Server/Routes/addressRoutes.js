import express from "express"
import authUser from "../Middlewares/auth.js"
import { addAddress, getAddress } from "../Controllers/addressController.js"

const addressRouter = express.Router()

addressRouter.post("/add", authUser, addAddress)
addressRouter.get("/get", authUser, getAddress)

export default addressRouter