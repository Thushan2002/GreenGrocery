import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized 1" });
    }

    try {
        const tokenCode = jwt.verify(token, process.env.JWT_SECRET);

        if (tokenCode.userId) {
            req.user = tokenCode.userId;
        } else {
            return res.status(401).json({ success: false, message: "Unauthorized 2" });
        }
        next();

    } catch (error) {
        console.error("JWT verify error:", error);
        return res.status(401).json({ success: false, message: "Unauthorized 3" });
    }
};

export default authUser