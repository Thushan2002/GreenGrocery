import Product from "../Models/ProductModel.js";
import Order from "../Models/orderModel.js";
import stripe from "stripe"

// place order COD

export const placeOrderCOD = async (req, res) => {
    try {
        const { items, address } = req.body;
        const userId = req.user
        if (!address || items.length === 0) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        // calculate total amount
        let amount = 0;
        for (const item of items) {
            const product = await Product.findById(item.product);
            amount += product.offerPrice * item.quantity;
        }


        // tax charge (2%)
        amount += Math.floor(amount * 0.02);

        await Order.create({
            userId,
            items: items.map(item => ({
                product: item.product,
                quantity: item.quantity
            })),
            amount,
            address,
            paymentType: 'COD'
        });
        res.json({ message: 'Order placed successfully', success: true });
    } catch (error) {
        console.log("error", error.message);
        res.status(500).json({ success: false, error: error.message });
    }
}

// place order online

export const placeOrderOnline = async (req, res) => {
    try {
        const { items, address } = req.body;
        const userId = req.user
        const { origin } = req.headers
        if (!address || items.length === 0) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        // calculate total amount
        let amount = 0;
        const productData = []
        for (const item of items) {
            const product = await Product.findById(item.product);
            productData.push({
                product: product.name,
                price: product.offerPrice,
                quantity: item.quantity
            })
            amount += product.offerPrice * item.quantity;
        }
        // tax charge (2%)
        amount += Math.floor(amount * 0.02);

        const order = await Order.create({
            userId,
            items: items.map(item => ({
                product: item.product,
                quantity: item.quantity
            })),
            amount,
            address,
            paymentType: 'Online'
        });

        // create stripe instance
        const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY)

        // create line items
        const line_items = productData.map((item) => {
            return {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: item.product
                    },
                    unit_amount: Math.floor(item.price * 1.02 * 100)
                },
                quantity: item.quantity
            }
        })

        // create session

        const session = await stripeInstance.checkout.sessions.create({
            line_items,
            mode: "payment",
            success_url: `${origin}/loader?next=my-orders`,
            cancel_url: `${origin}/cart`,
            metadata: {
                orderId: order._id.toString(),
                userId
            }
        })
        res.json({ success: true, url: session.url });
    } catch (error) {
        console.log("error", error.message);
        res.status(500).json({ success: false, error: error.message });
    }
}

// get orders by userId
export const getUserOrders = async (req, res) => {
    try {
        const userId = req.user
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