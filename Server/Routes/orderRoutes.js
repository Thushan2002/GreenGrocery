import express from 'express';
import { getAllOrders, getUserOrders, placeOrderCOD } from '../Controllers/orderController.js';
import authSeller from '../Middlewares/authSeller.js';
import authUser from '../Middlewares/auth.js';

const orderRouter = express.Router();

orderRouter.post('/cod', authUser, placeOrderCOD)
orderRouter.get('/user', authUser, getUserOrders);
orderRouter.get('/seller', authSeller, getAllOrders);

export default orderRouter;