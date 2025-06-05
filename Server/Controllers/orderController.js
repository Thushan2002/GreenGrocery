import Product from "../Models/ProductModel.js";
import Order from "../Models/orderModel.js";

// place order COD



export const placeOrderCOD = async (req, res) => {
    try {
        const { userId, items, address } = req.body;
        if (!address || items.length === 0) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        // calculate total amount
        let amount = await items.reduce(async (acc, item) => {
            const product = await Product.findById(item.product);
            return await acc + (product.offerPrice * item.quantity);
        }, 0);

        // tax charge (2%)
        amount = Math.floor(amount * 0.02);

        await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: 'COD'
        });
        res.json({ message: 'Order placed successfully', success: true });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

// get orders by userId
export const getUserOrders = async (req, res) => {
    try {
        const { userId } = req.body;
        const orders = await Order.find({
            userId, $or: [{ paymentType: "COD" }, { isPaid: true }]
        }).populate('items.product address').sort({ createdAt: -1 });
        res.json({ success: true, orders });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

// get all orders

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            $or: [{ paymentType: "COD" }, { isPaid: true }]
        }).populate('items.product address').sort({ createdAt: -1 });
        res.json({ success: true, orders });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}