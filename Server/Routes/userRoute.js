import express from 'express';
import { registerUser } from '../Controllers/UserController.js';
const userRouter = express.Router();

userRouter.post("/register", registerUser)

export default userRouter;

