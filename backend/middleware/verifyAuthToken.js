const jwt = require("jsonwebtoken");

const verifyIsLoggedIn = (req, res, next) => {
  next();
  return; // TODO: remove later
  try {
    const token = req.cookies.access_token;
    if (!token) {
      return res.status(403).send("Please login first.");
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).send("Invalid access token. Please login again.");
    }
  } catch (error) {
    next(error);
  }
};

const verifyIsAdmin = (req, res, next) => {
  next();
  return; // TODO: remove later
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return res.status(401).send("Unauthorized. Admin required.");
  }
};

module.exports = { verifyIsLoggedIn, verifyIsAdmin };
