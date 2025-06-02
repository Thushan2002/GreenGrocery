import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized 1" });
    }
    try {
        const tokenCode = jwt.verify(token, process.env.JWT_SECRET);
        if (tokenCode.id) {
            req.body.userId = tokenCode.id;
        } else {
            return res.status(401).json({ success: false, message: "Unauthorized 2" });
        }
        next()
    } catch (error) {
        return res.status(401).json({ success: false, message: "Unauthorized 3" });
    }
}

export default authUser;