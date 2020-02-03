import jwt from "jsonwebtoken";

export default (req, res, next) => {
  if (
    !req ||
    !req.headers ||
    (!req.headers.authorization && !req.headers.Authorization)
  ) {
    return res.status(401).json({
      message: "No authorization token"
    });
  }

  const token =
    req.headers.authorization ||
    req.headers.Authorization ||
    req.headers["access_token"];

  try {
    const id_token = token.replace("Bearer ", "");
    const decoded = jwt.verify(id_token, process.env.JWT_SECRET);

    req.user = {
      id: decoded.userId,
      access_token: decoded.id
    };

    return next();
  } catch (err) {
    // Error with the JsonWebToken verification
    return res.status(401).json({
      message: err.message
    });
  }
};
