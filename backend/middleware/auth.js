import jwt from "jsonwebtoken";

const protect = (req, res, next) => {
    try {
        const authHeader = req.header("Authorization");

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).json({ message: "No token. Access denied." });
        }

        const token = authHeader.replace("Bearer ", "").trim();
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next()
    } catch (err) {
        console.error("Auth Middleware Error: ", err.message);

        if (err.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token expired. Please login again." });
        }

        return res.status(401).json({ message: "Invalid token. Access denied." });
    }
};

export { protect }