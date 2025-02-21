import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Access Denied! No token provided" });
    }

    jwt.verify(token, "bookStore123", (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Invalid Token" });
        }

        console.log("✅ Decoded Token:", decoded); // Debugging log
        req.user = decoded.authclaims; // Ensure `id` is included
        next();
    });
};


export default authenticateToken;
