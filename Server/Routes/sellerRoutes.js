import express from 'express';
import { isSellerAuth, sellerLogin, sellerLogout } from '../Controllers/sellerController';
import authSeller from '../Middlewares/authSeller';

const sellerRouter = express.Router();

sellerRouter.post("/login", sellerLogin)
sellerRouter.get("/is-auth", authSeller, isSellerAuth,)
sellerRouter.get("/logout", sellerLogout)

export default sellerRouter;

