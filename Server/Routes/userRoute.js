import express from 'express';
import { isAuth, login, logout, registerUser } from '../Controllers/UserController.js';
import authUser from '../Middlewares/auth.js';
const userRouter = express.Router();

userRouter.post("/register", registerUser)
userRouter.post("/login", login)
userRouter.get("/is-auth", authUser, isAuth)
userRouter.post("/logout", authUser, logout)

export default userRouter;

