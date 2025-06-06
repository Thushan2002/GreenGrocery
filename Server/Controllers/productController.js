import { v2 as cloudinary } from 'cloudinary';
import Product from '../Models/ProductModel.js';
// add product
export const addProduct = async (req, res) => {
    try {
        let productData = JSON.parse(req.body.productData)
        const images = req.files
        if (!images || !Array.isArray(images) || images.length === 0) {
            return res.status(400).json({ success: false, message: "No images uploaded" });
        }
        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: "image" })
                return result.secure_url
            })
        )
        await Product.create({ ...productData, image: imagesUrl })
        return res.status(200).json({
            success: true,
            message: "Product added",
        });
    } catch (error) {
        console.log(error.message);
        if (!res.headersSent) {
            return res.status(500).json({ success: false, message: error.message });
        }
        return; // Always return to prevent further execution
    }
};


// Get product
export const productList = async (req, res) => {
    try {
        const products = await Product.find({})
        return res.json({ success: true, products })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
}

// get single product
export const productById = async (req, res) => {
    try {
        const { id } = req.body
        const product = await Product.findById(id)
        return res.json({ success: true, product })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
}

// change stock
export const changeStock = async (req, res) => {
    try {
        const { id, inStock } = req.body
        await Product.findByIdAndUpdate(id, { inStock })
        return res.json({ success: true, message: "stock updated" })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
}