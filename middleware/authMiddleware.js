import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
    try {
        let token = req.header("Authorization");
        if (!token) return res.status(400).json({msg: "Invalid Authentication."});
        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft();
        }
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (!verified) return res.status(400).json({msg: "Invalid Authentication."});
        req.user = verified;
        next();
    } catch (e) {
        console.log(e);
    }
}