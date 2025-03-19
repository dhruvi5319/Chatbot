import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  // ✅ Debug: Log request headers
  console.log("🔍 Checking Authorization Header...");
  
  const authHeader = req.headers.authorization;
  console.log("📩 Received Authorization Header:", authHeader);

  // ✅ Check if token is missing or malformed
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.error("🚨 No token found, access denied.");
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  // ✅ Extract Token
  const token = authHeader.split(" ")[1];
  console.log("🔑 Extracted Token:", token);

  try {
    // ✅ Verify Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Token verified, decoded payload:", decoded);

    // ✅ Attach user payload to request object
    req.user = decoded;
    next();
  } catch (error) {
    console.error("🚨 Invalid Token:", error.message);
    return res.status(401).json({ message: "Token is not valid" });
  }
};

export default authMiddleware;