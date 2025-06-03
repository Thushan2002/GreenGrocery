import jwt from "jsonwebtoken";

const authSeller = async (req, res, next) => {
    const { sellerToken } = req.cookies;
    if (!sellerToken) {
        return res.status(401).json({ success: false, message: "Unauthorized Seller" });
    }
    try {
        const tokenCode = jwt.verify(sellerToken, process.env.JWT_SECRET);
        if (tokenCode.email === process.env.SELLER_EMAIL) {
            next()
        } else {
            return res.status(401).json({ success: false, message: "Unauthorized 2" });
        }
        next()
    } catch (error) {
        return res.status(401).json({ success: false, message: "Unauthorized 3" });
    }
}

export default authSeller;