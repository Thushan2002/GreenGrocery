// seller login
export const sellerLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }
        if (password === process.env.SELLER_PASSWORD && email === process.env.SELLER_EMAIL) {
            const token = jwt.sign(
                { email: process.env.SELLER_EMAIL },
                process.env.JWT_SECRET,
                { expiresIn: '7d' }
            );

            res.cookie("sellerToken", token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: process.env.NODE_ENV === 'production' ? "none" : 'strict', maxAge: 7 * 24 * 60 * 60 * 1000 }); // 7 days

            return res.status(200).json({
                success: true,
                message: "Seller logged in successfully",
            });
        }
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

// seller auth
export const isSellerAuth = async (req, res) => {
    try {
        return res.status(200).json({
            success: true,
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
}

// logout seller
export const sellerLogout = async (req, res) => {
    try {
        res.clearCookie("token", { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: process.env.NODE_ENV === 'production' ? "none" : 'strict' });
        return res.status(200).json({ success: true, message: "Logged out successfully" });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
}