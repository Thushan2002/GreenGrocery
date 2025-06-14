import mongoose from 'mongoose';
const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true, ref: 'user' },
    items: [{
        productId: { type: String, required: true, ref: 'product' },
        quantity: { type: Number, required: true, default: 1 }
    }],
    amount: { type: Number, required: true },
    address: { type: String, required: true, ref: 'address' },
    status: { type: String, required: true, default: 'order placed' },
    paymentType: { type: String, required: true },
    isPaid: { type: Boolean, required: true, default: false },
}, { timestamps: true });

const Order = mongoose.model.order || mongoose.model('Order', orderSchema);
export default Order;